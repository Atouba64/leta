import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import StatusBadge from '../../components/StatusBadge';
import LetaMap from '../../components/LetaMap';
import { getTicket } from '../../services/tickets';
import { DEMO_CUSTOMER_TICKETS } from '../../services/mockData';
import theme from '../../theme';

export default function TicketTracking({ route, navigation }) {
  const { ticketId, ticket: initial } = route.params || {};
  const [ticket, setTicket] = useState(initial || null);

  useEffect(() => {
    if (initial) return;
    if (!ticketId) return;
    getTicket(ticketId).then(setTicket);
  }, [ticketId, initial]);

  const demo = DEMO_CUSTOMER_TICKETS[0];
  const t = ticket || demo;
  const center = t.address || { lat: 33.749, lng: -84.388 };
  const markers = center.lat
    ? [{ id: 'site', lat: center.lat, lng: center.lng, title: 'Service location' }]
    : [];

  return (
    <Screen scroll>
      <LetaButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
      <StatusBadge status={t.status} />
      <Text style={styles.title}>{t.title}</Text>
      <LetaMap center={center} markers={markers} style={styles.map} />
      <Text style={styles.meta}>Live tracking when assigned tech shares location.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginTop: theme.spacing.md },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: theme.spacing.md },
  map: { marginTop: theme.spacing.md, height: 240 },
});
