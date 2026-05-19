import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import TicketThread from '../../components/TicketThread';
import { useAuth } from '../../contexts/AuthContext';
import { getPartnerTicket, partnerApproveCloseout } from '../../services/partnerTickets';
import { TICKET_STATUS } from '../../firebase/collections';
import theme from '../../theme';

export default function PartnerTicketDetail({ route, navigation }) {
  const { ticketId, title: routeTitle } = route.params || {};
  const { user, demoMode } = useAuth();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (demoMode) {
      setTicket({
        id: ticketId,
        title: routeTitle || 'Demo work order',
        partnerWorkOrderId: 'BAM-CRDL-88421',
        status: TICKET_STATUS.ON_SITE,
        poc: { name: 'Brad' },
        accessNotes: 'POC only — do not call store main line.',
      });
      return;
    }
    getPartnerTicket(ticketId).then(setTicket);
  }, [ticketId, demoMode, routeTitle]);

  const onJoinVoice = (data) => {
    navigation.navigate('PartnerVoiceCall', {
      sessionId: data.sessionId,
      ticketId,
      title: ticket?.title || routeTitle,
    });
  };

  const onApprove = async () => {
    if (demoMode) {
      Alert.alert('Approved (demo)', 'Close-out marked billable.');
      return;
    }
    await partnerApproveCloseout(ticketId, user.uid);
    Alert.alert('Approved', 'Ticket marked complete for billing.');
  };

  if (!ticket && !demoMode) {
    return (
      <Screen>
        <Text>Loading…</Text>
      </Screen>
    );
  }

  const t = ticket || { title: routeTitle, status: TICKET_STATUS.PENDING };

  return (
    <Screen scroll>
      <StatusBadge status={t.status} />
      <Text style={styles.title}>{t.title}</Text>
      <Text style={styles.meta}>Partner WO #{t.partnerWorkOrderId || ticketId}</Text>

      <LetaCard>
        <Text style={styles.section}>POC & access</Text>
        <Text style={styles.body}>{t.poc?.name ? `POC: ${t.poc.name}` : 'See ticket'}</Text>
        <Text style={styles.body}>{t.accessNotes || 'Standard onsite access'}</Text>
      </LetaCard>

      <TicketThread
        ticketId={ticketId}
        ticketTitle={t.title}
        onJoinVoiceCall={onJoinVoice}
      />

      <LetaButton title="Approve close-out" variant="secondary" onPress={onApprove} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginTop: theme.spacing.sm },
  meta: { ...theme.typography.caption, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  section: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: 8 },
  body: { ...theme.typography.bodySmall, color: theme.colors.text, lineHeight: 20 },
});
