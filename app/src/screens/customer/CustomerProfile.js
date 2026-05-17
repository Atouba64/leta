import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import LogoMark from '../../components/LogoMark';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

export default function CustomerProfile() {
  const { user, logOut, demoMode } = useAuth();

  return (
    <Screen scroll>
      <LogoMark size={44} />
      <Text style={styles.name}>{user?.displayName}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      {demoMode ? <Text style={styles.badge}>Demo mode</Text> : null}

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>
        <Text style={styles.cardSub}>B2B invoicing and PO workflows ship in a later release.</Text>
      </LetaCard>

      <LetaButton title="Sign out" variant="secondary" onPress={logOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: { ...theme.typography.h2, marginTop: theme.spacing.md },
  email: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  badge: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  card: { marginVertical: theme.spacing.lg },
  cardTitle: { ...theme.typography.h3 },
  cardSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 6 },
});
