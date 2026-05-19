import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirebase } from '../config/firebase';
import { COLLECTIONS, MESSAGE_TYPE } from '../firebase/collections';

function messagesCol(ticketId) {
  const { db } = getFirebase();
  return collection(db, COLLECTIONS.TICKETS, ticketId, COLLECTIONS.MESSAGES);
}

/**
 * Ticket-scoped chat — partner dispatcher ↔ field tech (and system lines).
 * All comms logged for disputes; personal numbers stay hidden until policy allows.
 */
export function subscribeTicketMessages(ticketId, callback) {
  const { db, configured } = getFirebase();
  if (!configured || !ticketId) {
    callback([]);
    return () => {};
  }

  const q = query(messagesCol(ticketId), orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function sendTicketMessage(ticketId, { senderId, senderRole, senderLabel, body, type = MESSAGE_TYPE.TEXT }) {
  const { db, configured } = getFirebase();
  if (!configured) return { id: `local-${Date.now()}` };

  const ref = await addDoc(messagesCol(ticketId), {
    senderId,
    senderRole,
    senderLabel: senderLabel || senderRole,
    body,
    type,
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, COLLECTIONS.TICKETS, ticketId, COLLECTIONS.TICKET_EVENTS), {
    type: 'message_sent',
    actorId: senderId,
    payload: { messageType: type },
    createdAt: serverTimestamp(),
  });

  return { id: ref.id };
}

export async function sendCallInviteMessage(ticketId, { senderId, senderRole, senderLabel, sessionId }) {
  return sendTicketMessage(ticketId, {
    senderId,
    senderRole,
    senderLabel,
    type: MESSAGE_TYPE.CALL_INVITE,
    body: `Voice call started — join in Leta Live (session ${sessionId.slice(0, 8)}…).`,
  });
}
