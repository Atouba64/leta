import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import {
  getLocalTechOnboardingStatus,
  isTechOnboardingComplete,
  markTechOnboardingFormOpened,
  markTechOnboardingSubmitted,
} from '../services/techOnboarding';

export function useTechOnboarding() {
  const { user, role, demoMode } = useAuth();
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [formOpened, setFormOpened] = useState(false);

  const refresh = useCallback(async () => {
    if (!user?.uid) {
      setComplete(false);
      setFormOpened(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const [done, local] = await Promise.all([
      isTechOnboardingComplete(user.uid, demoMode),
      getLocalTechOnboardingStatus(user.uid),
    ]);
    setComplete(done);
    setFormOpened(Boolean(local.formOpened));
    setLoading(false);
  }, [user?.uid, demoMode]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const openForm = useCallback(async () => {
    if (!user?.uid) return;
    await markTechOnboardingFormOpened(user.uid);
    setFormOpened(true);
  }, [user?.uid]);

  const confirmSubmitted = useCallback(async () => {
    if (!user?.uid) return;
    await markTechOnboardingSubmitted(user.uid);
    setComplete(true);
    setFormOpened(true);
  }, [user?.uid]);

  return {
    loading,
    complete,
    formOpened,
    refresh,
    openForm,
    confirmSubmitted,
    isRequired: role === 'field_tech',
  };
}
