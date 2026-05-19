import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth, ROLES } from '../contexts/AuthContext';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import TechnicianNavigator from './TechnicianNavigator';
import RemoteNavigator from './RemoteNavigator';
import PartnerNavigator from './PartnerNavigator';
import theme from '../theme';
import { navigationRef } from './navigationRef';

function RoleApp() {
  const { role } = useAuth();

  if (role === ROLES.FIELD_TECH) return <TechnicianNavigator />;
  if (role === ROLES.REMOTE_TECH) return <RemoteNavigator />;
  if (role === ROLES.PARTNER_DISPATCHER) return <PartnerNavigator />;
  return <CustomerNavigator />;
}

export default function RootNavigator() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isAuthenticated ? <RoleApp /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.bg,
  },
});
