import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  where,
  orderBy,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { getFirebase } from '../config/firebase';
import { COLLECTIONS, OFFER_STATUS } from '../firebase/collections';
import { haversineMiles } from '../utils/geo';

const OFFER_TTL_MINUTES = 40;

export async function createOffersForTicket(ticket, activeTechs) {
  const { db, configured } = getFirebase();
  if (!configured) return [];

  const expiresAt = Timestamp.fromMillis(Date.now() + OFFER_TTL_MINUTES * 60 * 1000);
  const created = [];

  for (const tech of activeTechs) {
    if (!tech.location?.lat || !ticket.address?.lat) continue;

    const distanceMi = haversineMiles(
      tech.location.lat,
      tech.location.lng,
      ticket.address.lat,
      ticket.address.lng,
    );

    if (distanceMi > (tech.radiusMi || 50)) continue;

    const ref = await addDoc(collection(db, COLLECTIONS.OFFERS), {
      ticketId: ticket.id,
      techId: tech.id,
      status: OFFER_STATUS.PENDING,
      payout: estimatePayout(distanceMi, ticket.urgency),
      distanceMi: Math.round(distanceMi * 10) / 10,
      expiresAt,
      createdAt: serverTimestamp(),
    });
    created.push(ref.id);
  }

  return created;
}

function estimatePayout(distanceMi, urgency) {
  const base = 95;
  const travel = distanceMi * 2.5;
  const surge = urgency === 'asap' ? 35 : 0;
  return Math.round(base + travel + surge);
}

export function subscribePendingOffersForTech(techId, callback) {
  const { db, configured } = getFirebase();
  if (!configured) return () => {};

  const q = query(
    collection(db, COLLECTIONS.OFFERS),
    where('techId', '==', techId),
    where('status', '==', OFFER_STATUS.PENDING),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function acceptOfferCallable(offerId) {
  const { functions, configured } = getFirebase();
  if (!configured) {
    return { ticketId: 'demo-ticket', status: 'assigned' };
  }

  const fn = httpsCallable(functions, 'acceptOffer');
  const { data } = await fn({ offerId });
  return data;
}

export async function fetchOpenTicketsForDispatch() {
  const { db, configured } = getFirebase();
  if (!configured) return [];

  const q = query(
    collection(db, COLLECTIONS.TICKETS),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function listActiveFieldTechs() {
  const { db, configured } = getFirebase();
  if (!configured) return [];

  const q = query(
    collection(db, COLLECTIONS.USERS),
    where('role', '==', 'field_tech'),
    where('isActive', '==', true),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
