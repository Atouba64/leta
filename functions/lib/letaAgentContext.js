/**
 * Build system prompt + optional live context for Leta agent requests.
 * RBAC: only include Firestore data the caller is allowed to see.
 */

const knowledge = require('./letaKnowledge.json');

const ROLES = ['customer', 'field_tech', 'remote_tech', 'admin', 'partner_dispatcher'];

/**
 * @param {import('firebase-admin/firestore').Firestore} db
 * @param {{ uid?: string, role?: string, tenantId?: string | null }} auth
 * @returns {Promise<{ audience: string, systemPrompt: string }>}
 */
async function buildAgentContext(db, auth = {}) {
  const role = auth.role || 'public';
  const audience = ROLES.includes(role) ? role : 'public';
  const blocks = [buildStaticBlock()];

  if (auth.uid && audience !== 'public') {
    const live = await loadLiveContext(db, auth.uid, audience, auth.tenantId || null);
    if (live) blocks.push(live);
  }

  blocks.push(buildAudienceRules(audience));

  return {
    audience,
    systemPrompt: blocks.join('\n\n'),
  };
}

function buildStaticBlock() {
  const k = knowledge;
  return [
    `You are the Leta AI assistant for ${k.company} (${k.website}).`,
    k.tagline,
    '',
    '## Public facts',
    `- Phone: ${k.phone}`,
    `- Email: general ${k.emails.general}, support ${k.emails.support}, partners ${k.emails.partners}, techs ${k.emails.technicians}`,
    `- Book a call: ${k.bookingUrl}`,
    `- Coverage: ${k.coverage.state} — ${k.coverage.anchorCount} anchor markets (${k.coverage.metros})`,
    `- Corridors: ${k.coverage.corridors.join(', ')}`,
    `- Recruit: ${k.recruit.link} (${k.recruit.responseTime})`,
    `- Partner channels: ${k.partnerChannels.join('; ')}`,
  ].join('\n');
}

function buildAudienceRules(audience) {
  const rules = {
    public:
      'Audience: public visitor. Answer product/ coverage/ recruit/ partner overview questions. Never invent ticket data. Offer human handoff for account-specific or urgent issues.',
    customer:
      'Audience: signed-in customer. Use only their ticket context below. Do not expose other users or partner internals.',
    field_tech:
      'Audience: field technician. Help with their offers/jobs. Barrister jobs: POC-only, call dispatch on Leta — do not advise calling store main lines.',
    remote_tech:
      'Audience: remote tech (overwatch). Summarize assigned escalations; support Leta Live prep.',
    partner_dispatcher:
      'Audience: partner dispatcher. Scope answers to their tenant tickets only.',
    admin:
      'Audience: Leta admin/operator. Ops summaries and drafts OK; still no secrets or invented ticket IDs.',
  };
  return `## Rules\n${rules[audience] || rules.public}`;
}

/**
 * @param {import('firebase-admin/firestore').Firestore} db
 * @param {string} uid
 * @param {string} audience
 * @param {string | null} tenantId
 */
async function loadLiveContext(db, uid, audience, tenantId) {
  const lines = ['## Live context (from Leta — do not invent beyond this)'];

  if (audience === 'customer') {
    const snap = await db
      .collection('tickets')
      .where('customerId', '==', uid)
      .orderBy('updatedAt', 'desc')
      .limit(5)
      .get()
      .catch(() => null);
    if (!snap || snap.empty) {
      lines.push('No tickets found for this customer.');
    } else {
      snap.docs.forEach((doc) => {
        const t = doc.data();
        lines.push(
          `- Ticket ${doc.id}: ${t.title || 'Untitled'} | status=${t.status || 'unknown'} | tech=${t.assignedTechId || 'unassigned'}`
        );
      });
    }
    return lines.join('\n');
  }

  if (audience === 'field_tech') {
    const [activeSnap, offerSnap] = await Promise.all([
      db
        .collection('tickets')
        .where('assignedTechId', '==', uid)
        .where('status', 'in', ['assigned', 'en_route', 'on_site', 'in_progress', 'escalated'])
        .limit(5)
        .get()
        .catch(() => null),
      db
        .collection('offers')
        .where('techId', '==', uid)
        .where('status', '==', 'pending')
        .limit(5)
        .get()
        .catch(() => null),
    ]);

    if (activeSnap && !activeSnap.empty) {
      lines.push('Active jobs:');
      activeSnap.docs.forEach((doc) => {
        const t = doc.data();
        const wo = t.partnerWorkOrderId ? ` WO=${t.partnerWorkOrderId}` : '';
        lines.push(`- ${doc.id}: ${t.title || 'Job'} | status=${t.status}${wo}`);
      });
    } else {
      lines.push('No active jobs.');
    }

    if (offerSnap && !offerSnap.empty) {
      lines.push('Pending offers:');
      offerSnap.docs.forEach((doc) => {
        const o = doc.data();
        lines.push(`- Offer ${doc.id} → ticket ${o.ticketId || '?'}`);
      });
    }

    return lines.join('\n');
  }

  if (audience === 'remote_tech') {
    const snap = await db
      .collection('escalations')
      .where('remoteTechId', '==', uid)
      .limit(5)
      .get()
      .catch(() => null);
    if (!snap || snap.empty) {
      lines.push('No assigned escalations.');
    } else {
      lines.push('Escalations:');
      snap.docs.forEach((doc) => {
        const e = doc.data();
        lines.push(`- ${doc.id}: ticket=${e.ticketId || '?'} status=${e.status || 'unknown'}`);
      });
    }
    return lines.join('\n');
  }

  if (audience === 'partner_dispatcher' && tenantId) {
    const snap = await db
      .collection('tickets')
      .where('partnerId', '==', tenantId)
      .orderBy('updatedAt', 'desc')
      .limit(8)
      .get()
      .catch(() => null);
    if (!snap || snap.empty) {
      lines.push('No partner tickets for this tenant.');
    } else {
      lines.push(`Partner tickets (tenant ${tenantId}):`);
      snap.docs.forEach((doc) => {
        const t = doc.data();
        lines.push(
          `- ${doc.id}: ${t.title || 'WO'} | status=${t.status} | WO=${t.partnerWorkOrderId || 'n/a'}`
        );
      });
    }
    return lines.join('\n');
  }

  if (audience === 'admin') {
    const snap = await db
      .collection('tickets')
      .orderBy('updatedAt', 'desc')
      .limit(5)
      .get()
      .catch(() => null);
    if (snap && !snap.empty) {
      lines.push('Recent tickets (sample):');
      snap.docs.forEach((doc) => {
        const t = doc.data();
        lines.push(`- ${doc.id}: ${t.status} — ${t.title || 'Untitled'}`);
      });
    }
    return lines.join('\n');
  }

  return null;
}

/**
 * @param {import('firebase-admin/auth').Auth} authAdmin
 * @param {string | undefined} bearer
 */
async function resolveAuth(authAdmin, bearer) {
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return { audience: 'public' };
  }
  const token = bearer.slice(7).trim();
  if (!token) return { audience: 'public' };

  try {
    const decoded = await authAdmin.verifyIdToken(token);
    const role = decoded.role || 'customer';
    return {
      uid: decoded.uid,
      role,
      tenantId: decoded.tenantId || null,
      audience: ROLES.includes(role) ? role : 'public',
    };
  } catch {
    return { audience: 'public' };
  }
}

module.exports = { buildAgentContext, resolveAuth, ROLES };
