import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LetaButton from './LetaButton';
import LetaCard from './LetaCard';
import PartnerChannelBadge from './PartnerChannelBadge';
import { getPartnerChannelConfig } from '../constants/partnerChannels';
import { formatMiles } from '../utils/geo';
import theme from '../theme';

export default function PartnerOfferCard({ offer, onPress, onAccept }) {
  const channel = getPartnerChannelConfig(offer);
  const wo = offer.partnerWorkOrderId;

  return (
    <LetaCard style={styles.card} onPress={onPress}>
      <PartnerChannelBadge offerOrTicket={offer} />
      <Text style={styles.payout}>{offer.payout}</Text>
      {wo ? (
        <Text style={styles.wo}>
          {channel?.workOrderLabel || 'WO'} {wo}
        </Text>
      ) : null}
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.meta}>
        {formatMiles(offer.distanceMi)} · SLA {offer.sla || '—'}
        {offer.urgent ? ' · Urgent' : ''}
      </Text>
      {offer.site ? <Text style={styles.site}>{offer.site}</Text> : null}
      {offer.poc?.name ? (
        <Text style={styles.poc}>
          POC: {offer.poc.name}
          {offer.poc.phone ? ` · ${offer.poc.phone}` : ''}
        </Text>
      ) : null}
      {offer.contactPolicy === 'poc_only' ? (
        <Text style={styles.policy}>POC only — no store main line</Text>
      ) : null}
      <View style={styles.actions}>
        {onPress ? <LetaButton title="View details" variant="secondary" onPress={onPress} /> : null}
        {onAccept ? <LetaButton title="Accept job" onPress={onAccept} /> : null}
      </View>
    </LetaCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: theme.spacing.sm },
  payout: { ...theme.typography.h2, color: theme.colors.primary },
  wo: { ...theme.typography.caption, color: theme.colors.primary, fontWeight: '700', marginTop: 4 },
  title: { ...theme.typography.h3, marginTop: 6 },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 4 },
  site: { ...theme.typography.bodySmall, marginTop: 4 },
  poc: { ...theme.typography.bodySmall, color: theme.colors.text, marginTop: 6, fontWeight: '500' },
  policy: {
    ...theme.typography.caption,
    color: theme.colors.warning,
    marginTop: 6,
    fontWeight: '600',
  },
  actions: { gap: theme.spacing.sm, marginTop: theme.spacing.md },
});
