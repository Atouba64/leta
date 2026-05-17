import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import { TICKET_STATUS } from '../services/mockData';

const STATUS_LABELS = {
  [TICKET_STATUS.PENDING]: { label: 'Pending', bg: theme.colors.warningBg, color: theme.colors.warning },
  [TICKET_STATUS.ASSIGNED]: { label: 'Assigned', bg: theme.colors.primarySurface, color: theme.colors.primary },
  [TICKET_STATUS.EN_ROUTE]: { label: 'En route', bg: theme.colors.primarySurface, color: theme.colors.primaryDark },
  [TICKET_STATUS.ON_SITE]: { label: 'On site', bg: theme.colors.primarySurface, color: theme.colors.primaryDark },
  [TICKET_STATUS.IN_PROGRESS]: { label: 'In progress', bg: theme.colors.primarySurface, color: theme.colors.primary },
  [TICKET_STATUS.ESCALATED]: { label: 'Overwatch', bg: '#ccfbf1', color: '#0d9488' },
  [TICKET_STATUS.COMPLETED]: { label: 'Completed', bg: theme.colors.successBg, color: theme.colors.success },
  [TICKET_STATUS.CANCELLED]: { label: 'Cancelled', bg: theme.colors.dangerBg, color: theme.colors.danger },
};

export default function StatusBadge({ status }) {
  const meta = STATUS_LABELS[status] || { label: status, bg: theme.colors.bg, color: theme.colors.muted };

  return (
    <View style={[styles.badge, { backgroundColor: meta.bg }]}>
      <Text style={[styles.text, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radii.pill,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
