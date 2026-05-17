import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StatusBadge from './StatusBadge';
import LetaCard from './LetaCard';
import {
  formatCompletedDate,
  formatEstimate,
  formatTicketId,
  getAssignedTechLabel,
  getTicketLocation,
} from '../utils/ticketDisplay';
import theme from '../theme';

function Row({ label, value }) {
  if (!value) return null;
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function TicketDetailCard({ ticket }) {
  if (!ticket) return null;

  const loc = getTicketLocation(ticket);
  const tech = getAssignedTechLabel(ticket);
  const estimate = formatEstimate(ticket);
  const completed = formatCompletedDate(ticket);
  const skills = ticket.skillTags?.length ? ticket.skillTags.join(', ') : null;

  return (
    <LetaCard style={styles.card}>
      <StatusBadge status={ticket.status} />
      <Text style={styles.title}>{ticket.title}</Text>
      <Text style={styles.ticketId}>Ticket {formatTicketId(ticket.id)}</Text>

      <View style={styles.divider} />

      <Row label="Location" value={loc?.formatted || ticket.site} />
      <Row label="Technician" value={tech} />
      {ticket.etaMinutes != null && ticket.status === 'en_route' ? (
        <Row label="ETA" value={`~${ticket.etaMinutes} min`} />
      ) : null}
      <Row label="Estimate" value={estimate} />
      <Row label="Completed" value={completed} />
      <Row label="Skills" value={skills} />
      {ticket.description ? (
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Notes</Text>
          <Text style={styles.notes}>{ticket.description}</Text>
        </View>
      ) : null}
    </LetaCard>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: theme.spacing.sm },
  title: { ...theme.typography.h2, marginTop: theme.spacing.sm },
  ticketId: { ...theme.typography.caption, color: theme.colors.muted, marginTop: 4 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  row: { marginBottom: theme.spacing.sm },
  rowLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSoft,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  rowValue: { ...theme.typography.body, color: theme.colors.text, lineHeight: 22 },
  notes: { ...theme.typography.bodySmall, color: theme.colors.textSoft, lineHeight: 20 },
});
