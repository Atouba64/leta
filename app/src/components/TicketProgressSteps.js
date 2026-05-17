import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getProgressSteps } from '../utils/ticketDisplay';
import theme from '../theme';

export default function TicketProgressSteps({ ticket }) {
  const steps = getProgressSteps(ticket);

  return (
    <View style={styles.wrap} accessibilityRole="list">
      {steps.map((step, index) => (
        <View key={`${step.label}-${index}`} style={styles.row} accessibilityRole="listitem">
          <View style={styles.rail}>
            <View
              style={[
                styles.dot,
                step.state === 'done' && styles.dotDone,
                step.state === 'current' && styles.dotCurrent,
              ]}
            />
            {index < steps.length - 1 ? <View style={styles.line} /> : null}
          </View>
          <Text
            style={[
              styles.label,
              step.state === 'current' && styles.labelCurrent,
              step.state === 'upcoming' && styles.labelUpcoming,
            ]}
          >
            {step.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: theme.spacing.md },
  row: { flexDirection: 'row', minHeight: 36 },
  rail: { width: 28, alignItems: 'center' },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.border,
    marginTop: 4,
  },
  dotDone: { backgroundColor: theme.colors.success },
  dotCurrent: { backgroundColor: theme.colors.primary, transform: [{ scale: 1.2 }] },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: theme.colors.border,
    marginVertical: 2,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
    paddingBottom: theme.spacing.sm,
  },
  labelCurrent: { color: theme.colors.primary },
  labelUpcoming: { color: theme.colors.muted, fontWeight: '500' },
});
