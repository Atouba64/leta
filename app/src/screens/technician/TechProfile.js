import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

export default function TechProfile() {
  const { user, logOut } = useAuth();

  return (
    <Screen scroll>
      <Text style={styles.title}>Technician profile</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Verified skills</Text>
        <Text style={styles.skills}>Networking · POS Systems · Hardware Repair</Text>
        <Text style={styles.cardSub}>Background check & COI required before production activation.</Text>
      </LetaCard>
      <LetaButton title="Sign out" variant="secondary" onPress={logOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h2, marginTop: theme.spacing.sm },
  email: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  card: { marginBottom: theme.spacing.lg },
  cardTitle: { ...theme.typography.h3 },
  skills: { marginTop: 8, fontWeight: '600', color: theme.colors.primary },
  cardSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 8 },
});
