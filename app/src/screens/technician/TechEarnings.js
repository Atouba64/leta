import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaCard from '../../components/LetaCard';
import theme from '../../theme';

export default function TechEarnings() {
  return (
    <Screen scroll>
      <Text style={styles.title}>Earnings</Text>
      <Text style={styles.sub}>Fast payouts after verified close-out (Stripe + escrow in production).</Text>

      <LetaCard style={styles.hero}>
        <Text style={styles.label}>This week</Text>
        <Text style={styles.amount}>$1,240</Text>
        <Text style={styles.note}>12 completed tickets · 4.9★ avg</Text>
      </LetaCard>

      <LetaCard>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Available for payout</Text>
          <Text style={styles.rowValue}>$380</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Instant payout fee (1%)</Text>
          <Text style={styles.rowValue}>Optional</Text>
        </View>
      </LetaCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h2, marginTop: theme.spacing.sm },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  hero: { backgroundColor: theme.colors.primarySurface, marginBottom: theme.spacing.md },
  label: { ...theme.typography.caption, color: theme.colors.primary },
  amount: { fontSize: 36, fontWeight: '800', color: theme.colors.ink },
  note: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowLabel: { color: theme.colors.textSoft },
  rowValue: { fontWeight: '700', color: theme.colors.ink },
});
