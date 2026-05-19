import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROFICIENCY } from '../constants/techSkills';
import { getUserProfile, updateUserProfile } from './users';
import { getFirebase } from '../config/firebase';

/** Mirrors web onboarding autofill — applied when tech confirms submission in app */
export const ONBOARDING_PROFILE_SEED = {
  headline: 'Atlanta POS, networking and Cradlepoint · 1099',
  bio: 'Metro Atlanta field tech focused on POS, networking, and Cradlepoint installs. I carry a full laptop kit, labeler, Wi-Fi tools, and basic hand tools. Comfortable with partner dispatch rules, POC-only contact, and digital close-out.',
  skillEntries: [
    { id: 'networking', label: 'Networking / Wi-Fi', proficiency: PROFICIENCY.EXPERT },
    { id: 'pos', label: 'POS / retail systems', proficiency: PROFICIENCY.EXPERT },
    { id: 'printers', label: 'Printers & peripherals', proficiency: PROFICIENCY.COMFORTABLE },
    { id: 'pc_mac', label: 'PC / Mac repair', proficiency: PROFICIENCY.COMFORTABLE },
    { id: 'cabling', label: 'Cable / rack / patch', proficiency: PROFICIENCY.COMFORTABLE },
    { id: 'cradlepoint', label: 'Cradlepoint / LTE', proficiency: PROFICIENCY.COMFORTABLE },
  ],
  highlightSkillIds: ['networking', 'pos', 'cradlepoint'],
  travelRadiusMi: 45,
  minPayout: 100,
  workPreferences: ['Quick break-fix', 'Partner dispatch', 'Multi-hour projects'],
};

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

  const skills = ONBOARDING_PROFILE_SEED.skillEntries.map((e) => e.label);
  const { configured } = getFirebase();
  if (configured) {
    await updateUserProfile(uid, {
      techOnboardingSubmittedAt: new Date().toISOString(),
      techProfile: ONBOARDING_PROFILE_SEED,
      skills,
    });
  }
}

export async function markTechOnboardingFormOpened(uid) {
  return setLocalTechOnboardingStatus(uid, { formOpened: true });
}
