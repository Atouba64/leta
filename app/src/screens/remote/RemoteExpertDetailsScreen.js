import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaCard from '../../components/LetaCard';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

const SPECIALTIES = ['Network escalation', 'Windows / imaging', 'POS & retail', 'Cisco / switching'];

export default function RemoteExpertDetailsScreen() {
  const { user, demoMode } = useAuth();

  return (
    <Screen scroll title="Expert profile">
      <Text style={styles.lead}>
        Overwatch experts join Leta Live sessions to help field techs on hard tickets. Production vetting requires 5+
        years of relevant experience.
      </Text>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Specialties</Text>
        <View style={styles.tags}>
          {SPECIALTIES.map((s) => (
            <View key={s} style={styles.tag}>
              <Text style={styles.tagText}>{s}</Text>
            </View>
          ))}
        </View>
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Session expectations</Text>
        <Text style={styles.bullet}>• Join from the Overwatch queue when a tech escalates</Text>
        <Text style={styles.bullet}>• Video assist via Leta Live (dev build for WebRTC)</Text>
        <Text style={styles.bullet}>• Mark resolved when the field tech confirms fix</Text>
      </LetaCard>

      {demoMode ? (
        <Text style={styles.demo}>Demo mode — queue uses sample escalations</Text>
      ) : null}

      <Text style={styles.footer}>Signed in as {user?.email}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lead: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  card: { marginBottom: theme.spacing.sm },
  cardTitle: { ...theme.typography.h3 },
  bullet: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 6, lineHeight: 20 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  tag: {
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radii.pill,
  },
  tagText: { fontSize: 13, fontWeight: '600', color: '#0f766e' },
  demo: { marginTop: theme.spacing.md, color: theme.roleAccents.remote_tech, fontWeight: '700', fontSize: 13 },
  footer: { ...theme.typography.caption, color: theme.colors.muted, marginTop: theme.spacing.lg },
});
