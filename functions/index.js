const admin = require('firebase-admin');
const { onDocumentWritten } = require('firebase-functions/v2/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const cors = require('cors');

setGlobalOptions({ region: 'us-east1' });

admin.initializeApp();
const db = admin.firestore();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? require('stripe')(stripeSecret) : null;

const { askOpenClaw, isOpenClawConfigured } = require('./lib/openclawClient');
const { handleLetaAgentChat } = require('./lib/letaAgentChat');
const {
  preparePartnerTrackerFiles,
  verifyOpsTrackerPin,
} = require('./lib/partnerTrackerDeploy');
const { commitFilesToGitHub } = require('./lib/partnerTrackerGitHub');

const ROLES = ['customer', 'field_tech', 'remote_tech', 'admin', 'partner_dispatcher'];

/**
 * Sync Firestore user.role → Auth custom claims (client refreshes ID token after signup).
 */
exports.syncUserRoleClaims = onDocumentWritten('users/{userId}', async (event) => {
  const after = event.data?.after;
  if (!after?.exists) return;

  const { role, tenantId } = after.data();
  if (!role || !ROLES.includes(role)) {
    console.warn('syncUserRoleClaims: invalid role', role, event.params.userId);
    return;
  }

  await admin.auth().setCustomUserClaims(event.params.userId, {
    role,
    tenantId: tenantId || null,
  });
});

/**
 * Callable: create Stripe PaymentIntent for a ticket (customer checkout).
 */
exports.createPaymentIntent = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.');
  }
  if (!stripe) {
    throw new HttpsError('failed-precondition', 'Stripe is not configured on the server.');
  }

  const { ticketId, amountCents, currency = 'usd' } = request.data || {};
  if (!ticketId || !amountCents || amountCents < 50) {
    throw new HttpsError('invalid-argument', 'ticketId and amountCents (>= 50) required.');
  }

  const ticketRef = db.collection('tickets').doc(ticketId);
  const ticketSnap = await ticketRef.get();
  if (!ticketSnap.exists) {
    throw new HttpsError('not-found', 'Ticket not found.');
  }
  if (ticketSnap.data().customerId !== request.auth.uid) {
    throw new HttpsError('permission-denied', 'Not your ticket.');
  }

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(amountCents),
    currency,
    metadata: { ticketId, customerId: request.auth.uid },
    automatic_payment_methods: { enabled: true },
  });

  await ticketRef.update({
    'payment.intentId': intent.id,
    'payment.status': 'requires_payment',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { clientSecret: intent.client_secret, paymentIntentId: intent.id };
});

/**
 * Callable: field tech accepts an offer → assign ticket, expire sibling offers.
 */
exports.acceptOffer = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.');
  }

  const { offerId } = request.data || {};
  if (!offerId) {
    throw new HttpsError('invalid-argument', 'offerId required.');
  }

  const offerRef = db.collection('offers').doc(offerId);
  const offerSnap = await offerRef.get();
  if (!offerSnap.exists) {
    throw new HttpsError('not-found', 'Offer not found.');
  }

  const offer = offerSnap.data();
  if (offer.techId !== request.auth.uid) {
    throw new HttpsError('permission-denied', 'Not your offer.');
  }
  if (offer.status !== 'pending') {
    throw new HttpsError('failed-precondition', 'Offer is no longer available.');
  }

  const ticketRef = db.collection('tickets').doc(offer.ticketId);
  const ticketSnap = await ticketRef.get();
  if (!ticketSnap.exists) {
    throw new HttpsError('not-found', 'Ticket not found.');
  }
  if (ticketSnap.data().assignedTechId) {
    throw new HttpsError('failed-precondition', 'Ticket already assigned.');
  }

  const batch = db.batch();
  batch.update(offerRef, { status: 'accepted', acceptedAt: admin.firestore.FieldValue.serverTimestamp() });
  batch.update(ticketRef, {
    assignedTechId: request.auth.uid,
    status: 'assigned',
    payout: offer.payout,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const siblings = await db
    .collection('offers')
    .where('ticketId', '==', offer.ticketId)
    .where('status', '==', 'pending')
    .get();

  siblings.forEach((doc) => {
    if (doc.id !== offerId) {
      batch.update(doc.ref, { status: 'expired' });
    }
  });

  batch.set(ticketRef.collection('events').doc(), {
    type: 'tech_assigned',
    techId: request.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await batch.commit();
  return { ticketId: offer.ticketId, status: 'assigned' };
});

/**
 * Callable: create Leta Live session + escalation record (WebRTC signaling via Firestore).
 */
exports.createLiveSession = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.');
  }

  const { ticketId } = request.data || {};
  if (!ticketId) {
    throw new HttpsError('invalid-argument', 'ticketId required.');
  }

  const ticketRef = db.collection('tickets').doc(ticketId);
  const ticketSnap = await ticketRef.get();
  if (!ticketSnap.exists) {
    throw new HttpsError('not-found', 'Ticket not found.');
  }

  const ticket = ticketSnap.data();
  const uid = request.auth.uid;
  const isField = ticket.assignedTechId === uid;
  const isRemote = request.auth.token.role === 'remote_tech';

  if (!isField && !isRemote) {
    throw new HttpsError('permission-denied', 'Must be assigned tech or remote expert.');
  }

  const sessionRef = db.collection('live_sessions').doc();
  const escalationRef = db.collection('escalations').doc();

  await db.runTransaction(async (tx) => {
    tx.set(sessionRef, {
      ticketId,
      fieldTechId: ticket.assignedTechId,
      remoteTechId: isRemote ? uid : null,
      status: 'waiting',
      roomId: sessionRef.id,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    tx.set(escalationRef, {
      ticketId,
      sessionId: sessionRef.id,
      fieldTechId: ticket.assignedTechId,
      status: 'waiting',
      priority: 'normal',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    tx.update(ticketRef, {
      status: 'escalated',
      remoteTechId: isRemote ? uid : ticket.remoteTechId,
      activeSessionId: sessionRef.id,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  });

  return { sessionId: sessionRef.id, roomId: sessionRef.id, escalationId: escalationRef.id };
});

/**
 * Callable: remote expert joins waiting session.
 */
exports.joinLiveSession = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.');
  }
  if (request.auth.token.role !== 'remote_tech') {
    throw new HttpsError('permission-denied', 'Remote expert role required.');
  }

  const { sessionId } = request.data || {};
  const sessionRef = db.collection('live_sessions').doc(sessionId);
  const snap = await sessionRef.get();
  if (!snap.exists) {
    throw new HttpsError('not-found', 'Session not found.');
  }

  await sessionRef.update({
    remoteTechId: request.auth.uid,
    status: 'active',
    joinedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { sessionId, roomId: snap.data().roomId };
});

/**
 * Callable: partner dispatcher ↔ field tech voice/video on ticket (Leta Live, purpose partner_voice).
 * Does not replace overwatch escalation — lighter session for direct partner coordination.
 */
exports.createTicketChannelCall = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.');
  }

  const { ticketId } = request.data || {};
  if (!ticketId) {
    throw new HttpsError('invalid-argument', 'ticketId required.');
  }

  const ticketRef = db.collection('tickets').doc(ticketId);
  const ticketSnap = await ticketRef.get();
  if (!ticketSnap.exists) {
    throw new HttpsError('not-found', 'Ticket not found.');
  }

  const ticket = ticketSnap.data();
  const uid = request.auth.uid;
  const role = request.auth.token.role || '';
  const tenantId = request.auth.token.tenantId || null;

  const isField = ticket.assignedTechId === uid;
  const isPartner = role === 'partner_dispatcher' && ticket.partnerId && ticket.partnerId === tenantId;

  if (!isField && !isPartner) {
    throw new HttpsError('permission-denied', 'Must be assigned tech or partner on this ticket.');
  }

  const sessionRef = db.collection('live_sessions').doc();
  await sessionRef.set({
    ticketId,
    fieldTechId: ticket.assignedTechId || null,
    partnerId: ticket.partnerId || null,
    partnerDispatcherId: isPartner ? uid : ticket.partnerDispatcherId || null,
    purpose: 'partner_voice',
    status: 'waiting',
    roomId: sessionRef.id,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await ticketRef.update({
    activeSessionId: sessionRef.id,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { sessionId: sessionRef.id, roomId: sessionRef.id };
});

/**
 * Callable: join partner_voice session (partner dispatcher or assigned field tech).
 */
exports.joinTicketChannelCall = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.');
  }

  const { sessionId } = request.data || {};
  const sessionRef = db.collection('live_sessions').doc(sessionId);
  const snap = await sessionRef.get();
  if (!snap.exists) {
    throw new HttpsError('not-found', 'Session not found.');
  }

  const session = snap.data();
  const uid = request.auth.uid;
  const role = request.auth.token.role || '';
  const tenantId = request.auth.token.tenantId || null;

  const isField = session.fieldTechId === uid;
  const isPartner = role === 'partner_dispatcher' && session.partnerId === tenantId;

  if (!isField && !isPartner) {
    throw new HttpsError('permission-denied', 'Not a participant on this call.');
  }

  const patch = {
    status: 'active',
    joinedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  if (isPartner) patch.partnerDispatcherId = uid;

  await sessionRef.update(patch);
  return { sessionId, roomId: session.roomId };
});

// --- Express API (Stripe webhook + health) ---
const app = express();
app.use(cors({ origin: true }));

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'leta-functions' });
});

/**
 * POST /tech/onboard
 * Receives technician onboarding form submission, saves full data,
 * and extracts email for mailing list.
 */
app.post('/tech/onboard', express.json({ limit: '1mb' }), async (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.email) {
      return res.status(400).json({ ok: false, message: 'Email is required' });
    }

    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    // 1. Save full application to technician_applications
    const appRef = db.collection('technician_applications').doc();
    
    // 2. Save essential data to mailing_list (upsert by email to prevent duplicates)
    const emailKey = data.email.toLowerCase().trim();
    const mailingListRef = db.collection('mailing_list').doc(emailKey);

    await db.runTransaction(async (tx) => {
      tx.set(appRef, {
        ...data,
        createdAt: timestamp,
        status: 'pending',
      });

      tx.set(mailingListRef, {
        email: emailKey,
        firstName: data.legal_first_name || '',
        lastName: data.legal_last_name || '',
        source: 'tech_onboarding_form',
        updatedAt: timestamp,
      }, { merge: true });
    });

    res.json({ ok: true, message: 'Application received' });
  } catch (err) {
    console.error('tech/onboard error:', err);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }
});

/**
 * Public + authenticated AI chat for website widget and external clients.
 * POST /agent/chat  { message, history? }  — optional Authorization: Bearer <Firebase ID token>
 */
app.post('/agent/chat', express.json({ limit: '32kb' }), async (req, res) => {
  try {
    const result = await handleLetaAgentChat(db, admin.auth(), {
      message: req.body?.message,
      history: req.body?.history,
      authorization: req.headers.authorization,
    });
    const status = result.ok ? 200 : result.enabled ? 502 : 503;
    res.status(status).json(result);
  } catch (err) {
    console.error('agent/chat', err);
    res.status(err.status || 500).json({ ok: false, message: err.message || 'Server error' });
  }
});

/**
 * POST /ops-tracker/save — commit tracker JSON to GitHub (PIN + GITHUB_TOKEN required).
 * Body: { pin, data, commitMessage? }
 */
app.post('/ops-tracker/save', express.json({ limit: '4mb' }), async (req, res) => {
  try {
    const { pin, data, commitMessage } = req.body || {};
    if (!verifyOpsTrackerPin(pin)) {
      return res.status(403).json({ ok: false, message: 'Invalid PIN.' });
    }
    if (!data || !Array.isArray(data.entries)) {
      return res.status(400).json({ ok: false, message: 'Invalid tracker payload (entries required).' });
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_REPO_OWNER || 'Atouba64';
    const repo = process.env.GITHUB_REPO_NAME || 'leta';
    const branch = process.env.GITHUB_REPO_BRANCH || 'main';

    if (!token) {
      return res.status(503).json({
        ok: false,
        message:
          'GITHUB_TOKEN not configured on Cloud Functions. See functions/.env.example and deploy functions.',
      });
    }

    const { sourceContent, deployContent } = preparePartnerTrackerFiles(data);
    const message =
      commitMessage ||
      `chore(ops-tracker): update partner platform tracker (${data.meta?.lastUpdated || 'sheet'})`;

    const result = await commitFilesToGitHub({
      token,
      owner,
      repo,
      branch,
      message,
      files: [
        { path: 'data/partner-platform-tracker.json', content: sourceContent },
        { path: 'website/ops-tracker-data.json', content: deployContent },
      ],
    });

    res.json({
      ok: true,
      commitSha: result.sha,
      commitUrl: result.url,
      message: 'Pushed to GitHub. Netlify will redeploy ops-tracker in ~1 minute.',
    });
  } catch (err) {
    console.error('ops-tracker/save', err);
    res.status(500).json({ ok: false, message: err.message || 'Save failed.' });
  }
});

exports.api = onRequest(app);

exports.stripeWebhook = onRequest(async (req, res) => {
  if (!stripe) {
    return res.status(503).send('Stripe not configured');
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    const ticketId = pi.metadata?.ticketId;
    if (ticketId) {
      await db.collection('tickets').doc(ticketId).update({
        'payment.status': 'paid',
        'payment.paidAt': admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }

  res.json({ received: true });
});

/**
 * Callable (admin): optional OpenClaw ops digest — off unless OPENCLAW_OPS_ENABLED=true.
 * Placeholders: functions/.env → OPENCLAW_URL, OPENCLAW_GATEWAY_TOKEN, OPENCLAW_AGENT_ID.
 */
exports.openclawOpsDigest = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in required.');
  }
  const role = request.auth.token.role || '';
  if (role !== 'admin') {
    throw new HttpsError('permission-denied', 'Admin only.');
  }

  if (!isOpenClawConfigured()) {
    return {
      enabled: false,
      message:
        'OpenClaw ops disabled. Set OPENCLAW_OPS_ENABLED=true and tokens in functions/.env (see openclaw/README.md).',
    };
  }

  const { topic = 'daily ops summary', ticketId } = request.data || {};
  const prompt = ticketId
    ? `Leta field-service ops: summarize ticket ${ticketId}. Topic: ${topic}. Use bullet points only.`
    : `Leta field-service ops: ${topic}. Use bullet points only. Do not invent ticket data.`;

  const result = await askOpenClaw(prompt);
  if (!result?.text) {
    return { enabled: true, ok: false, message: 'OpenClaw request failed or returned empty.' };
  }

  return { enabled: true, ok: true, draft: result.text };
});

/**
 * Callable: Leta AI chat — public (no auth) or role-aware when signed in.
 * Used by mobile app and authenticated clients.
 */
exports.letaAgentChat = onCall(async (request) => {
  const payload = {
    message: request.data?.message,
    history: request.data?.history,
    authorization: request.rawRequest?.headers?.authorization,
  };

  if (request.auth?.uid) {
    payload.auth = {
      uid: request.auth.uid,
      role: request.auth.token.role || 'customer',
      tenantId: request.auth.token.tenantId || null,
    };
  }

  return handleLetaAgentChat(db, admin.auth(), payload);
});
