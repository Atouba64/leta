import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { DEMO_CUSTOMER_TICKETS } from '../../services/mockData';
import theme from '../../theme';

export default function CustomerHome({ navigation }) {
  const { user, logOut } = useAuth();
  const active = DEMO_CUSTOMER_TICKETS.find((t) => t.status !== 'completed');

  return (
    <Screen scroll>
      <View style={styles.top}>
        <View>
          <Text style={styles.greet}>Hello, {user?.displayName || 'there'}</Text>
          <Text style={styles.sub}>Georgia · on-demand field IT</Text>
        </View>
        <LetaButton title="Sign out" variant="ghost" onPress={logOut} style={styles.signOut} />
      </View>

      <LetaCard style={styles.heroCard}>
        <Text style={styles.heroTitle}>Need a tech on site?</Text>
        <Text style={styles.heroSub}>Get an estimate, pick a window, and track your technician.</Text>
        <LetaButton
          title="Request service"
          onPress={() => navigation.navigate('CreateTicket')}
          style={styles.heroCta}
        />
      </LetaCard>

      {active ? (
        <>
          <Text style={styles.section}>Active ticket</Text>
          <LetaCard onPress={() => navigation.navigate('TicketTracking', { ticket: active })}>
            <View style={styles.row}>
              <StatusBadge status={active.status} />
              <Text style={styles.eta}>{active.etaMinutes} min ETA</Text>
            </View>
            <Text style={styles.ticketTitle}>{active.title}</Text>
            <Text style={styles.ticketMeta}>{active.site}</Text>
            <Text style={styles.ticketMeta}>Tech: {active.techName} · {active.estimate}</Text>
          </LetaCard>
        </>
      ) : null}

      <Text style={styles.section}>Recent</Text>
      {DEMO_CUSTOMER_TICKETS.map((t) => (
        <LetaCard key={t.id} style={styles.listCard}>
          <StatusBadge status={t.status} />
          <Text style={styles.ticketTitle}>{t.title}</Text>
          <Text style={styles.ticketMeta}>{t.site}</Text>
        </LetaCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: theme.spacing.sm },
  greet: { ...theme.typography.h2, color: theme.colors.ink },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  signOut: { minHeight: 40, paddingVertical: 8 },
  heroCard: { marginVertical: theme.spacing.md, backgroundColor: theme.colors.primarySurface },
  heroTitle: { ...theme.typography.h2, color: theme.colors.ink },
  heroSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 6, marginBottom: theme.spacing.md },
  heroCta: { alignSelf: 'flex-start' },
  section: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: theme.spacing.sm, marginTop: theme.spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  eta: { ...theme.typography.caption, color: theme.colors.primary },
  ticketTitle: { ...theme.typography.h3, color: theme.colors.ink, marginTop: 8 },
  ticketMeta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 4 },
  listCard: { marginBottom: theme.spacing.sm },
});
