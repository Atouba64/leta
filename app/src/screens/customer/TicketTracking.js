import React, { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import TicketDetailCard from '../../components/TicketDetailCard';
import TicketProgressSteps from '../../components/TicketProgressSteps';
import { getMapsDirectionsUrl, getTicketTrackingUrl } from '../../config/links';
import { getTicket } from '../../services/tickets';
import { DEMO_CUSTOMER_TICKETS } from '../../services/mockData';
import { isLiveTrackingAvailable } from '../../utils/ticketDisplay';
import theme from '../../theme';

export default function TicketTracking({ route }) {
  const { ticketId, ticket: initial } = route.params || {};
  const [ticket, setTicket] = useState(initial || null);

  useEffect(() => {
    if (!ticketId) return undefined;
    if (initial?.id === ticketId) return undefined;
    let cancelled = false;
    getTicket(ticketId).then((doc) => {
      if (!cancelled && doc) setTicket(doc);
    });
    return () => {
      cancelled = true;
    };
  }, [ticketId, initial]);

  const t =
    ticket ||
    DEMO_CUSTOMER_TICKETS.find((d) => d.id === ticketId) ||
    DEMO_CUSTOMER_TICKETS[0];

  const openWebTracker = () => {
    const url = getTicketTrackingUrl(t.id);
    Linking.openURL(url).catch(() => {
      Alert.alert('Could not open tracker', 'Try again or visit leta.repair/track.html in your browser.');
    });
  };

  const openDirections = () => {
    Linking.openURL(getMapsDirectionsUrl(t)).catch(() => {
      Alert.alert('Could not open maps');
    });
  };

  return (
    <Screen scroll title="Ticket details">
      <TicketDetailCard ticket={t} />

      <Text style={styles.sectionLabel}>Progress</Text>
      <TicketProgressSteps ticket={t} />

      <Text style={styles.hint}>
        {isLiveTrackingAvailable(t)
          ? 'Live map and minute-by-minute updates are on the web tracker so the app stays fast and simple.'
          : 'View the full timeline and service location on the web tracker.'}
      </Text>

      <LetaButton title="Open live tracking" onPress={openWebTracker} />
      <LetaButton title="Directions to site" variant="secondary" onPress={openDirections} style={styles.secondary} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    ...theme.typography.label,
    color: theme.colors.textSoft,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
  hint: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  secondary: { marginTop: theme.spacing.sm },
});
