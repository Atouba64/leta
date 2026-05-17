import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { useTechOnboarding } from '../../hooks/useTechOnboarding';
import { TICKET_STATUS } from '../../services/mockData';
import theme from '../../theme';

const DEMO_SKILLS = ['Networking', 'POS Systems', 'Hardware Repair', 'Printers'];

export default function TechCredentialsScreen() {
  const navigation = useNavigation();
  const { user, demoMode } = useAuth();
  const { complete } = useTechOnboarding();

  return (
    <Screen scroll title="Skills & credentials">
      {!complete ? (
        <LetaCard style={styles.requiredCard}>
          <Text style={styles.requiredTitle}>Complete onboarding first</Text>
          <Text style={styles.cardSub}>
            Skill tags and insurance details come from your web application. Finish Onboarding &amp; questions on
            leta.repair to unlock dispatch.
          </Text>
          <LetaButton title="Go to onboarding" onPress={() => navigation.navigate('TechOnboarding')} />
        </LetaCard>
      ) : null}

      <Text style={styles.lead}>
        What partners see when routing offers after your application is on file for {user?.email}.
      </Text>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Activation status</Text>
        <View style={styles.badgeRow}>
          <StatusBadge status={complete ? TICKET_STATUS.ASSIGNED : TICKET_STATUS.PENDING} />
          <Text style={styles.statusText}>
            {complete ? 'Application on file' : demoMode ? 'Demo technician' : 'Pending onboarding'}
          </Text>
        </View>
        <Text style={styles.cardSub}>
          Background check, GL insurance, and Georgia dispatch eligibility are reviewed after we receive your web
          application.
        </Text>
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Skill tags</Text>
        <Text style={styles.cardSub}>
          {complete
            ? 'Synced from your onboarding form when vetting is enabled.'
            : 'Available after you submit onboarding.'}
        </Text>
        {complete ? (
          <View style={styles.tags}>
            {DEMO_SKILLS.map((s) => (
              <View key={s} style={styles.tag}>
                <Text style={styles.tagText}>{s}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </LetaCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  requiredCard: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.warningBg,
    borderColor: theme.colors.warning,
    borderWidth: 1,
  },
  requiredTitle: { ...theme.typography.h3 },
  lead: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  card: { marginBottom: theme.spacing.sm },
  cardTitle: { ...theme.typography.h3 },
  cardSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 8, lineHeight: 20 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  statusText: { fontWeight: '600', color: theme.colors.text },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  tag: {
    backgroundColor: theme.colors.primarySurface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radii.pill,
  },
  tagText: { fontSize: 13, fontWeight: '600', color: theme.colors.primary },
});
