import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  orderBy,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { getFirebase } from '../config/firebase';
import { COLLECTIONS } from '../firebase/collections';

export async function requestEscalation(ticketId) {
  const { functions, configured } = getFirebase();
  if (!configured) {
    return { sessionId: 'demo-session', roomId: 'demo-room' };
  }

  const fn = httpsCallable(functions, 'createLiveSession');
  const { data } = await fn({ ticketId });
  return data;
}

export async function joinLiveSession(sessionId) {
  const { functions, configured } = getFirebase();
  if (!configured) {
    return { sessionId, roomId: sessionId };
  }

  const fn = httpsCallable(functions, 'joinLiveSession');
  const { data } = await fn({ sessionId });
  return data;
}

export function subscribeEscalationQueue(callback) {
  const { db, configured } = getFirebase();
  if (!configured) return () => {};

  const q = query(
    collection(db, COLLECTIONS.ESCALATIONS),
    where('status', '==', 'waiting'),
    orderBy('createdAt', 'asc'),
  );

  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

/** WebRTC signaling: write SDP/ICE to live_sessions/{id}/signals */
export async function publishSignal(sessionId, payload) {
  const { db, configured } = getFirebase();
  if (!configured) return;

  await addDoc(collection(db, COLLECTIONS.LIVE_SESSIONS, sessionId, COLLECTIONS.SIGNALS), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}

export function subscribeSignals(sessionId, onSignal) {
  const { db, configured } = getFirebase();
  if (!configured) return () => {};

  const q = query(
    collection(db, COLLECTIONS.LIVE_SESSIONS, sessionId, COLLECTIONS.SIGNALS),
    orderBy('createdAt', 'asc'),
  );

  return onSnapshot(q, (snap) => {
    snap.docChanges().forEach((change) => {
      if (change.type === 'added') {
        onSignal({ id: change.doc.id, ...change.doc.data() });
      }
    });
  });
}
