import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { subscribeCustomerTickets } from '../../services/tickets';
import { DEMO_CUSTOMER_TICKETS } from '../../services/mockData';
import theme from '../../theme';

export default function CustomerHome({ navigation }) {
  const { user, logOut, demoMode } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (demoMode) {
      setTickets(DEMO_CUSTOMER_TICKETS);
      return undefined;
    }
    return subscribeCustomerTickets(user.uid, setTickets);
  }, [user.uid, demoMode]);

  const active = tickets.find((t) => t.status && t.status !== 'completed' && t.status !== 'cancelled');

  return (
    <Screen scroll>
      <View style={styles.top}>
        <View>
          <Text style={styles.greet}>Hello, {user?.displayName}</Text>
          <Text style={styles.sub}>Georgia · on-demand field IT</Text>
        </View>
        <LetaButton title="Sign out" variant="ghost" onPress={logOut} style={styles.signOut} />
      </View>

      <LetaCard style={styles.heroCard}>
        <Text style={styles.heroTitle}>Need a tech on site?</Text>
        <LetaButton title="Request service" onPress={() => navigation.navigate('CreateTicket')} />
      </LetaCard>

      {active ? (
        <>
          <Text style={styles.section}>Active ticket</Text>
          <LetaCard onPress={() => navigation.navigate('TicketTracking', { ticketId: active.id, ticket: active })}>
            <StatusBadge status={active.status} />
            <Text style={styles.ticketTitle}>{active.title}</Text>
            <Text style={styles.ticketMeta}>{active.address?.formatted || active.site}</Text>
          </LetaCard>
          {active.pricing && !demoMode ? (
            <LetaButton
              title="Pay estimated balance"
              variant="secondary"
              onPress={() =>
                navigation.navigate('Payment', {
                  ticketId: active.id,
                  amountCents: Math.round((active.pricing.estimateMax || 200) * 100),
                  title: active.title,
                })
              }
            />
          ) : null}
        </>
      ) : null}

      <Text style={styles.section}>Recent</Text>
      {tickets.map((t) => (
        <LetaCard key={t.id} style={styles.listCard}>
          <StatusBadge status={t.status} />
          <Text style={styles.ticketTitle}>{t.title}</Text>
        </LetaCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', marginTop: theme.spacing.sm },
  greet: { ...theme.typography.h2 },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  signOut: { minHeight: 40 },
  heroCard: { marginVertical: theme.spacing.md, backgroundColor: theme.colors.primarySurface },
  heroTitle: { ...theme.typography.h2, marginBottom: theme.spacing.md },
  section: { ...theme.typography.label, color: theme.colors.textSoft, marginVertical: theme.spacing.sm },
  ticketTitle: { ...theme.typography.h3, marginTop: 8 },
  ticketMeta: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  listCard: { marginBottom: theme.spacing.sm },
});
