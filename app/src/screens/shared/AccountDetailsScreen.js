import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaCard from '../../components/LetaCard';
import LogoMark from '../../components/LogoMark';
import { useAuth } from '../../contexts/AuthContext';
import { getRoleLabel } from '../../navigation/profileMenuConfig';
import theme from '../../theme';

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </>
  );
}

export default function AccountDetailsScreen() {
  const { user, role, demoMode } = useAuth();

  return (
    <Screen scroll title="Account details">
      <LogoMark size={40} />
      <LetaCard style={styles.card}>
        <DetailRow label="Display name" value={user?.displayName} />
        <DetailRow label="Email" value={user?.email} />
        <DetailRow label="Role" value={getRoleLabel(role)} />
        <DetailRow label="User ID" value={user?.uid} />
        {demoMode ? <Text style={styles.demo}>Demo mode — sample data only</Text> : null}
      </LetaCard>
      <Text style={styles.note}>
        To change your email or legal name after onboarding, contact support at leta.repair. Production accounts sync
        from Firebase.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: theme.spacing.md },
  rowLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginTop: theme.spacing.sm,
  },
  rowValue: {
    ...theme.typography.body,
    color: theme.colors.text,
    marginTop: 4,
  },
  demo: {
    marginTop: theme.spacing.md,
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  note: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginTop: theme.spacing.lg,
    lineHeight: 20,
  },
});
