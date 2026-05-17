import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile, updateUserProfile } from './users';
import { getFirebase } from '../config/firebase';

const STORAGE_PREFIX = '@leta/tech-onboarding/';

function storageKey(uid) {
  return `${STORAGE_PREFIX}${uid}`;
}

export async function getLocalTechOnboardingStatus(uid) {
  try {
    const raw = await AsyncStorage.getItem(storageKey(uid));
    return raw ? JSON.parse(raw) : { submitted: false, formOpened: false };
  } catch {
    return { submitted: false, formOpened: false };
  }
}

export async function setLocalTechOnboardingStatus(uid, patch) {
  const current = await getLocalTechOnboardingStatus(uid);
  const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
  await AsyncStorage.setItem(storageKey(uid), JSON.stringify(next));
  return next;
}

/** True when tech has submitted the web onboarding form (local or Firestore). */
export async function isTechOnboardingComplete(uid, demoMode) {
  if (demoMode) {
    const local = await getLocalTechOnboardingStatus(uid);
    return Boolean(local.submitted);
  }

  const local = await getLocalTechOnboardingStatus(uid);
  if (local.submitted) return true;

  const { configured } = getFirebase();
  if (!configured) return false;

  const profile = await getUserProfile(uid);
  return Boolean(profile?.techOnboardingSubmittedAt);
}

export async function markTechOnboardingSubmitted(uid) {
  await setLocalTechOnboardingStatus(uid, { submitted: true, formOpened: true });

  const { configured } = getFirebase();
  if (configured) {
    await updateUserProfile(uid, {
      techOnboardingSubmittedAt: new Date().toISOString(),
    });
  }
}

export async function markTechOnboardingFormOpened(uid) {
  return setLocalTechOnboardingStatus(uid, { formOpened: true });
}
