import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import theme from '../../theme';

const STEPS = [
  { key: 'assigned', label: 'Assigned' },
  { key: 'en_route', label: 'En route' },
  { key: 'on_site', label: 'On site' },
  { key: 'completed', label: 'Done' },
];

export default function TicketTracking({ route, navigation }) {
  const ticket = route.params?.ticket || {};
  const currentIdx = STEPS.findIndex((s) => s.key === ticket.status) >= 0 ? STEPS.findIndex((s) => s.key === ticket.status) : 1;

  return (
    <Screen scroll>
      <LetaButton title="Back" variant="ghost" onPress={() => navigation.goBack()} style={styles.back} />
      <StatusBadge status={ticket.status} />
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.meta}>{ticket.site}</Text>

      <LetaCard style={styles.mapPlaceholder}>
        <Ionicons name="map-outline" size={32} color={theme.colors.primary} />
        <Text style={styles.mapText}>Live map tracking</Text>
        <Text style={styles.mapSub}>Connect Google Maps + Firestore in production</Text>
        {ticket.techName ? (
          <Text style={styles.tech}>{ticket.techName} · {ticket.etaMinutes} min away</Text>
        ) : null}
      </LetaCard>

      <Text style={styles.section}>Progress</Text>
      {STEPS.map((step, i) => (
        <View key={step.key} style={styles.stepRow}>
          <View style={[styles.dot, i <= currentIdx && styles.dotActive]} />
          <Text style={[styles.stepLabel, i <= currentIdx && styles.stepLabelActive]}>{step.label}</Text>
        </View>
      ))}

      <LetaButton title="Message support" variant="secondary" onPress={() => {}} style={styles.cta} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { alignSelf: 'flex-start', marginTop: theme.spacing.sm },
  title: { ...theme.typography.h1, color: theme.colors.ink, marginTop: theme.spacing.md },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  mapPlaceholder: { alignItems: 'center', paddingVertical: theme.spacing.xl, backgroundColor: theme.colors.primarySurface },
  mapText: { ...theme.typography.h3, marginTop: theme.spacing.sm },
  mapSub: { ...theme.typography.caption, color: theme.colors.textSoft, textAlign: 'center', marginTop: 4 },
  tech: { ...theme.typography.bodySmall, color: theme.colors.primary, marginTop: theme.spacing.sm, fontWeight: '600' },
  section: { ...theme.typography.label, color: theme.colors.textSoft, marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.border },
  dotActive: { backgroundColor: theme.colors.primary },
  stepLabel: { color: theme.colors.muted, fontSize: 16 },
  stepLabelActive: { color: theme.colors.ink, fontWeight: '600' },
  cta: { marginTop: theme.spacing.lg },
});
