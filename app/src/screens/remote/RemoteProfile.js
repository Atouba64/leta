import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

export default function RemoteProfile() {
  const { user, logOut } = useAuth();

  return (
    <Screen scroll>
      <Text style={styles.title}>Remote expert</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={styles.note}>Tier 2/3 overwatch · 5+ years experience required for production vetting.</Text>
      <LetaButton title="Sign out" variant="secondary" onPress={logOut} style={styles.cta} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h2, marginTop: theme.spacing.sm },
  email: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  note: { ...theme.typography.body, color: theme.colors.textSoft, marginTop: theme.spacing.lg, marginBottom: theme.spacing.lg },
  cta: {},
});
