import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPartnerChannelConfig } from '../constants/partnerChannels';
import theme from '../theme';

export default function PartnerChannelBadge({ offerOrTicket, compact }) {
  const cfg = getPartnerChannelConfig(offerOrTicket);
  if (!cfg) return null;

  return (
    <View style={[styles.wrap, compact && styles.wrapCompact]}>
      <Ionicons name="business-outline" size={compact ? 14 : 16} color={theme.colors.primary} />
      <Text style={[styles.text, compact && styles.textCompact]}>{cfg.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.primarySurface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  wrapCompact: { paddingVertical: 4, paddingHorizontal: 8 },
  text: { fontSize: 12, fontWeight: '700', color: theme.colors.primary },
  textCompact: { fontSize: 11 },
});
