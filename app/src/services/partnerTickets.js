import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  orderBy,
} from 'firebase/firestore';
import { getFirebase } from '../config/firebase';
import { COLLECTIONS, MESSAGE_TYPE, TICKET_STATUS } from '../firebase/collections';
import { sendTicketMessage } from './ticketMessages';

function ticketsCol() {
  const { db } = getFirebase();
  return collection(db, COLLECTIONS.TICKETS);
}

export async function createPartnerTicket(partnerId, dispatcherId, data) {
  const { db, configured } = getFirebase();
  if (!configured) {
    return { id: `demo-partner-${Date.now()}`, ...data, status: TICKET_STATUS.PENDING, partnerId };
  }

  const ref = await addDoc(ticketsCol(), {
    customerId: null,
    assignedTechId: null,
    remoteTechId: null,
    partnerId,
    partnerDispatcherId: dispatcherId,
    partnerWorkOrderId: data.partnerWorkOrderId || '',
    status: TICKET_STATUS.PENDING,
    title: data.title,
    description: data.description || '',
    issueType: data.issueType || 'partner_dispatch',
    address: data.address,
    urgency: data.urgency || 'scheduled',
    contactPolicy: data.contactPolicy || 'poc_only',
    poc: data.poc || {},
    accessNotes: data.accessNotes || '',
    skillsRequired: data.skillsRequired || [],
    pricing: data.pricing || { estimateMin: 0, estimateMax: 0, currency: 'USD' },
    payment: { status: 'partner_billed' },
    photos: [],
    channelLocked: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await addDoc(collection(db, COLLECTIONS.TICKETS, ref.id, COLLECTIONS.TICKET_EVENTS), {
    type: 'partner_created',
    actorId: dispatcherId,
    createdAt: serverTimestamp(),
  });

  await sendTicketMessage(ref.id, {
    senderId: dispatcherId,
    senderRole: 'partner_dispatcher',
    senderLabel: data.partnerOrgName || 'Partner dispatch',
    body: `Work order ${data.partnerWorkOrderId || ref.id} created on Leta. Field updates and messages stay on this ticket.`,
    type: MESSAGE_TYPE.SYSTEM,
  });

  return { id: ref.id };
}

export function subscribePartnerTickets(partnerId, callback) {
  const { db, configured } = getFirebase();
  if (!configured || !partnerId) {
    callback([]);
    return () => {};
  }

  const q = query(ticketsCol(), where('partnerId', '==', partnerId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function getPartnerTicket(ticketId) {
  const { db, configured } = getFirebase();
  if (!configured) return null;
  const snap = await getDoc(doc(db, COLLECTIONS.TICKETS, ticketId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function partnerApproveCloseout(ticketId, dispatcherId) {
  const { db, configured } = getFirebase();
  if (!configured) return;

  await updateDoc(doc(db, COLLECTIONS.TICKETS, ticketId), {
    status: TICKET_STATUS.COMPLETED,
    partnerApprovedAt: serverTimestamp(),
    partnerApprovedBy: dispatcherId,
    updatedAt: serverTimestamp(),
  });

  await sendTicketMessage(ticketId, {
    senderId: dispatcherId,
    senderRole: 'partner_dispatcher',
    senderLabel: 'Partner',
    body: 'Close-out approved — eligible for billing export.',
    type: MESSAGE_TYPE.SYSTEM,
  });
}
