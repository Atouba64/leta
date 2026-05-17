import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import { DEMO_TECH_OFFERS } from '../../services/mockData';
import theme from '../../theme';

export default function TechDispatch({ navigation }) {
  const [active, setActive] = useState(false);

  return (
    <Screen scroll>
      <View style={styles.activeRow}>
        <View>
          <Text style={styles.title}>Dispatch board</Text>
          <Text style={styles.sub}>Georgia · offers within your radius when Active</Text>
        </View>
        <Switch value={active} onValueChange={setActive} trackColor={{ true: theme.colors.primary }} />
      </View>

      {!active ? (
        <LetaCard style={styles.offline}>
          <Text style={styles.offlineTitle}>You are offline</Text>
          <Text style={styles.offlineSub}>Toggle Active to receive partner and direct customer offers.</Text>
        </LetaCard>
      ) : (
        <>
          <Text style={styles.section}>Available now</Text>
          {DEMO_TECH_OFFERS.map((o) => (
            <LetaCard key={o.id} style={styles.offer}>
              <View style={styles.offerTop}>
                <Text style={styles.payout}>{o.payout}</Text>
                {o.urgent ? <Text style={styles.urgent}>Urgent</Text> : null}
              </View>
              <Text style={styles.offerTitle}>{o.title}</Text>
              <Text style={styles.offerMeta}>
                {o.distanceMi} mi · SLA {o.sla} · {o.skills.join(', ')}
              </Text>
              <LetaButton
                title="Accept job"
                onPress={() => {
                  Alert.alert('Job accepted', 'Navigate to Active tab to run the mission.', [
                    { text: 'OK', onPress: () => navigation.navigate('Active') },
                  ]);
                }}
                style={styles.accept}
              />
            </LetaCard>
          ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  activeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.sm },
  title: { ...theme.typography.h2, color: theme.colors.ink },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  offline: { marginTop: theme.spacing.lg, backgroundColor: theme.colors.warningBg },
  offlineTitle: { ...theme.typography.h3 },
  offlineSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 6 },
  section: { ...theme.typography.label, color: theme.colors.textSoft, marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },
  offer: { marginBottom: theme.spacing.sm },
  offerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  payout: { ...theme.typography.h2, color: theme.colors.primary },
  urgent: { ...theme.typography.caption, color: theme.colors.danger, fontWeight: '700' },
  offerTitle: { ...theme.typography.h3, marginTop: 8 },
  offerMeta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 4 },
  accept: { marginTop: theme.spacing.md },
});
