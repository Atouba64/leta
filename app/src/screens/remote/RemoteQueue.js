import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import { DEMO_REMOTE_QUEUE } from '../../services/mockData';
import theme from '../../theme';

export default function RemoteQueue({ navigation }) {
  return (
    <Screen scroll>
      <Text style={styles.title}>Overwatch queue</Text>
      <Text style={styles.sub}>Field techs escalate here for Leta Live video assist.</Text>

      {DEMO_REMOTE_QUEUE.map((item) => (
        <LetaCard key={item.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.priority}>{item.priority === 'high' ? 'HIGH' : 'NORMAL'}</Text>
            <Text style={styles.wait}>Waiting {item.waitSeconds}s</Text>
          </View>
          <Text style={styles.ticketTitle}>{item.title}</Text>
          <Text style={styles.meta}>
            {item.techName} · {item.site} · #{item.ticketId}
          </Text>
          <LetaButton
            title="Join session"
            onPress={() => navigation.navigate('RemoteSession', { item })}
            style={styles.join}
          />
        </LetaCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h2, marginTop: theme.spacing.sm },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  card: { marginBottom: theme.spacing.sm },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  priority: { fontSize: 11, fontWeight: '800', color: theme.roleAccents.remote_tech },
  wait: { ...theme.typography.caption, color: theme.colors.muted },
  ticketTitle: { ...theme.typography.h3, marginTop: 8 },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 4 },
  join: { marginTop: theme.spacing.md },
});
