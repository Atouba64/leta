import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { subscribePartnerTickets } from '../../services/partnerTickets';
import { TICKET_STATUS } from '../../firebase/collections';
import theme from '../../theme';

const DEMO_TICKETS = [
  {
    id: 'demo-partner-1',
    title: 'Cradlepoint — Food Lion #442',
    partnerWorkOrderId: 'BAM-CRDL-88421',
    status: TICKET_STATUS.ON_SITE,
    address: { formatted: 'Atlanta, GA' },
  },
  {
    id: 'demo-partner-2',
    title: 'Qmatic display install',
    partnerWorkOrderId: 'QMAT-SPEC-11902',
    status: TICKET_STATUS.ASSIGNED,
    address: { formatted: 'Savannah, GA' },
  },
];

export default function PartnerHome({ navigation }) {
  const { user, profile, demoMode } = useAuth();
  const partnerId = profile?.tenantId || user?.uid;
  const [tickets, setTickets] = useState(demoMode ? DEMO_TICKETS : []);

  useEffect(() => {
    if (demoMode) {
      setTickets(DEMO_TICKETS);
      return undefined;
    }
    return subscribePartnerTickets(partnerId, setTickets);
  }, [partnerId, demoMode]);

  return (
    <Screen>
      <Text style={styles.title}>Partner dispatch</Text>
      <Text style={styles.sub}>
        Work orders for your organization — message and call field techs on-platform without tying up Leta ops.
      </Text>

      <LetaButton title="Create work order" onPress={() => navigation.navigate('PartnerCreateTicket')} />

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No open work orders.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate('PartnerTicketDetail', { ticketId: item.id, title: item.title })}
          >
            <View style={styles.rowTop}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <StatusBadge status={item.status} />
            </View>
            <Text style={styles.rowMeta}>WO #{item.partnerWorkOrderId || item.id}</Text>
            <Text style={styles.rowMeta}>{item.address?.formatted || 'Georgia'}</Text>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginBottom: theme.spacing.sm },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md, lineHeight: 20 },
  list: { marginTop: theme.spacing.md },
  empty: { ...theme.typography.body, color: theme.colors.muted, marginTop: theme.spacing.lg },
  row: {
    padding: theme.spacing.md,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    marginBottom: theme.spacing.sm,
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  rowTitle: { ...theme.typography.h3, flex: 1 },
  rowMeta: { ...theme.typography.caption, color: theme.colors.textSoft, marginTop: 4 },
});
