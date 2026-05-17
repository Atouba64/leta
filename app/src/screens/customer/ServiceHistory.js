import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { subscribeCustomerTickets } from '../../services/tickets';
import { DEMO_CUSTOMER_TICKETS } from '../../services/mockData';
import { formatTicketId, getTicketListSubtitle } from '../../utils/ticketDisplay';
import theme from '../../theme';

export default function ServiceHistory({ navigation }) {
  const { user, demoMode } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (demoMode) {
      setTickets(DEMO_CUSTOMER_TICKETS);
      return undefined;
    }
    return subscribeCustomerTickets(user.uid, setTickets);
  }, [user.uid, demoMode]);

  return (
    <Screen scroll title="Service history">
      <Text style={styles.sub}>
        Tap a ticket for a quick summary in the app. Open live tracking on the web for maps and detailed updates.
      </Text>

      {tickets.length ? (
        tickets.map((t) => (
          <LetaCard
            key={t.id}
            style={styles.card}
            onPress={() => navigation.navigate('TicketTracking', { ticketId: t.id, ticket: t })}
          >
            <View style={styles.cardTop}>
              <StatusBadge status={t.status} />
              <Text style={styles.ticketId}>{formatTicketId(t.id)}</Text>
            </View>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.meta} numberOfLines={2}>
              {getTicketListSubtitle(t)}
            </Text>
          </LetaCard>
        ))
      ) : (
        <Text style={styles.empty}>No service requests yet. Use Request service from the menu or Home.</Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  card: { marginBottom: theme.spacing.sm },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  ticketId: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    fontFamily: theme.typography.caption?.fontFamily,
  },
  title: { ...theme.typography.h3, marginTop: 8 },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 6, lineHeight: 20 },
  empty: { color: theme.colors.muted, marginTop: theme.spacing.lg, lineHeight: 22 },
});
