import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getFirebase } from '../config/firebase';
import { COLLECTIONS } from '../firebase/collections';

export async function getUserProfile(uid) {
  const { db, configured } = getFirebase();
  if (!configured) return null;

  const snap = await getDoc(doc(db, COLLECTIONS.USERS, uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createUserProfile(uid, { email, displayName, role, phone = null, skills = [], tenantId = null }) {
  const { db, configured } = getFirebase();
  if (!configured) return null;

  const ref = doc(db, COLLECTIONS.USERS, uid);
  const resolvedTenant =
    tenantId || (role === 'partner_dispatcher' ? `partner_${uid}` : null);
  const payload = {
    email,
    displayName,
    role,
    phone,
    skills,
    isActive: false,
    rating: 5,
    tenantId: resolvedTenant,
    location: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(ref, payload, { merge: true });
  return { id: uid, ...payload };
}

export async function updateUserProfile(uid, patch) {
  const { db, configured } = getFirebase();
  if (!configured) return;

  await updateDoc(doc(db, COLLECTIONS.USERS, uid), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

export async function setTechActive(uid, isActive) {
  return updateUserProfile(uid, { isActive });
}

export async function updateTechLocation(uid, { lat, lng }) {
  return updateUserProfile(uid, {
    location: { lat, lng, updatedAt: new Date().toISOString() },
  });
}
