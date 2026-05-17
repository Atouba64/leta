import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { goHome } from '../navigation/goHome';

export function useGoHome() {
  const navigation = useNavigation();
  const { role, isAuthenticated } = useAuth();

  return useCallback(() => {
    goHome({ navigation, role, isAuthenticated });
  }, [navigation, role, isAuthenticated]);
}
