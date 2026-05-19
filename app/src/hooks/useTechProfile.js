import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DEFAULT_TECH_PROFILE, SKILL_CATALOG } from '../constants/techSkills';
import { getUserProfile, updateUserProfile } from '../services/users';

const DEMO_PROFILE = {
  ...DEFAULT_TECH_PROFILE,
  headline: 'Atlanta POS & networking · 1099',
  bio: '5+ years retail IT and MSP subcontract work. Comfortable with Cradlepoint, Meraki, and register rollouts. I only accept jobs inside my radius unless payout is premium.',
  skillEntries: [
    { id: 'networking', label: 'Networking / Wi-Fi', proficiency: 'expert' },
    { id: 'pos', label: 'POS / retail systems', proficiency: 'expert' },
    { id: 'printers', label: 'Printers & peripherals', proficiency: 'comfortable' },
    { id: 'cradlepoint', label: 'Cradlepoint / LTE', proficiency: 'comfortable' },
  ],
  travelRadiusMi: 30,
  minPayout: 100,
  highlightSkillIds: ['networking', 'pos'],
  workPreferences: ['Quick break-fix', 'Partner dispatch'],
};

export function useTechProfile() {
  const { user, demoMode } = useAuth();
  const [profile, setProfile] = useState(DEFAULT_TECH_PROFILE);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (demoMode) {
      setProfile(DEMO_PROFILE);
      setLoading(false);
      return;
    }
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const doc = await getUserProfile(user.uid);
      const stored = doc?.techProfile || {};
      setProfile({
        ...DEFAULT_TECH_PROFILE,
        ...stored,
        skillEntries: stored.skillEntries?.length ? stored.skillEntries : mapLegacySkills(doc?.skills),
      });
    } finally {
      setLoading(false);
    }
  }, [user?.uid, demoMode]);

  useEffect(() => {
    load();
  }, [load]);

  const saveProfile = async (next) => {
    const merged = { ...profile, ...next };
    setProfile(merged);
    if (demoMode || !user?.uid) return merged;
    const skills = merged.skillEntries.map((e) => e.label || e.id);
    await updateUserProfile(user.uid, {
      techProfile: merged,
      skills,
    });
    return merged;
  };

  return { profile, setProfile, saveProfile, loading, reload: load };
}

function mapLegacySkills(skills = []) {
  if (!skills?.length) return [];
  return skills.map((label) => {
    const match = SKILL_CATALOG.find((c) => c.label === label || c.id === label);
    return {
      id: match?.id || label,
      label: match?.label || label,
      proficiency: 'comfortable',
    };
  });
}
