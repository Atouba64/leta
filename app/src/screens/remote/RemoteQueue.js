import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import { subscribeEscalationQueue } from '../../services/liveSession';
import { DEMO_REMOTE_QUEUE } from '../../services/mockData';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

export default function RemoteQueue({ navigation }) {
  const { demoMode } = useAuth();
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (demoMode) {
      setQueue(DEMO_REMOTE_QUEUE);
      return undefined;
    }
    return subscribeEscalationQueue(setQueue);
  }, [demoMode]);

  return (
    <Screen scroll>
      <Text style={styles.title}>Overwatch queue</Text>
      <Text style={styles.sub}>Leta Live · video assist for field techs</Text>

      {queue.map((item) => (
        <LetaCard key={item.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.priority}>{item.priority === 'high' ? 'HIGH' : 'NORMAL'}</Text>
          </View>
          <Text style={styles.ticketTitle}>{item.title || `Ticket ${item.ticketId}`}</Text>
          <Text style={styles.meta}>Session {item.sessionId}</Text>
          <LetaButton
            title="Join session"
            onPress={() =>
              navigation.navigate('RemoteSession', {
                sessionId: item.sessionId,
                ticketId: item.ticketId,
                title: item.title,
              })
            }
          />
        </LetaCard>
      ))}

      {!queue.length ? (
        <Text style={styles.empty}>No escalations waiting.</Text>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h2, marginTop: theme.spacing.sm },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  card: { marginBottom: theme.spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  priority: { fontSize: 11, fontWeight: '800', color: theme.roleAccents.remote_tech },
  ticketTitle: { ...theme.typography.h3, marginTop: 8 },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  empty: { color: theme.colors.muted, marginTop: theme.spacing.lg },
});
