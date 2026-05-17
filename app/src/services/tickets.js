import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  orderBy,
} from 'firebase/firestore';
import { getFirebase } from '../config/firebase';
import { COLLECTIONS, TICKET_STATUS } from '../firebase/collections';

function ticketsCol() {
  const { db } = getFirebase();
  return collection(db, COLLECTIONS.TICKETS);
}

export async function createTicket(customerId, data) {
  const { db, configured } = getFirebase();
  if (!configured) return { id: `demo-${Date.now()}`, ...data, status: TICKET_STATUS.PENDING };

  const ref = await addDoc(ticketsCol(), {
    customerId,
    assignedTechId: null,
    remoteTechId: null,
    partnerId: data.partnerId || null,
    status: TICKET_STATUS.PENDING,
    title: data.title,
    description: data.description || '',
    issueType: data.issueType,
    address: data.address,
    urgency: data.urgency || 'scheduled',
    pricing: data.pricing,
    payment: { status: 'unpaid' },
    photos: [],
    signatureUrl: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await addDoc(collection(db, COLLECTIONS.TICKETS, ref.id, COLLECTIONS.TICKET_EVENTS), {
    type: 'created',
    actorId: customerId,
    createdAt: serverTimestamp(),
  });

  return { id: ref.id };
}

export async function getTicket(ticketId) {
  const { db, configured } = getFirebase();
  if (!configured) return null;
  const snap = await getDoc(doc(db, COLLECTIONS.TICKETS, ticketId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function subscribeCustomerTickets(customerId, callback) {
  const { db, configured } = getFirebase();
  if (!configured) return () => {};

  const q = query(
    ticketsCol(),
    where('customerId', '==', customerId),
    orderBy('createdAt', 'desc'),
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function subscribeTechActiveTicket(techId, callback) {
  const { db, configured } = getFirebase();
  if (!configured) return () => {};

  const q = query(ticketsCol(), where('assignedTechId', '==', techId));
  const terminal = new Set([TICKET_STATUS.COMPLETED, TICKET_STATUS.CANCELLED]);

  return onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    const active = list.find((t) => t.status && !terminal.has(t.status));
    callback(active || null);
  });
}

export async function updateTicketStatus(ticketId, status, extra = {}) {
  const { db, configured } = getFirebase();
  if (!configured) return;

  await updateDoc(doc(db, COLLECTIONS.TICKETS, ticketId), {
    status,
    ...extra,
    updatedAt: serverTimestamp(),
  });
}

export async function appendTicketPhoto(ticketId, photoUrl) {
  const ticket = await getTicket(ticketId);
  if (!ticket) return;
  const photos = [...(ticket.photos || []), photoUrl];
  await updateDoc(doc(getFirebase().db, COLLECTIONS.TICKETS, ticketId), {
    photos,
    updatedAt: serverTimestamp(),
  });
}

export async function setTicketSignature(ticketId, signatureUrl) {
  const { db, configured } = getFirebase();
  if (!configured) return;

  await updateDoc(doc(db, COLLECTIONS.TICKETS, ticketId), {
    signatureUrl,
    status: TICKET_STATUS.COMPLETED,
    updatedAt: serverTimestamp(),
  });
}
