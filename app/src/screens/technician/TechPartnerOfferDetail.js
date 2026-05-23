import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import PartnerChannelBadge from '../../components/PartnerChannelBadge';
import PhoneContactCard from '../../components/PhoneContactCard';
import { BARRISTER_CHANNEL } from '../../constants/partnerChannels';
import { formatMiles } from '../../utils/geo';
import { acceptOfferCallable } from '../../services/offers';
import { setDemoActiveJobFromOffer } from '../../services/demoActiveJob';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

export default function TechPartnerOfferDetail({ route, navigation }) {
  const { demoMode } = useAuth();
  const offer = route.params?.offer;
  const channel = BARRISTER_CHANNEL;

  if (!offer) {
    return (
      <Screen>
        <Text style={styles.missing}>Offer not found.</Text>
        <LetaButton title="Back to dispatch" onPress={() => navigation.goBack()} />
      </Screen>
    );
  }

  const accept = async () => {
    try {
      if (demoMode) {
        setDemoActiveJobFromOffer(offer);
        Alert.alert('Job accepted', 'Open Active — Barrister dispatch view is ready.', [
          { text: 'Open Active', onPress: () => navigation.navigate('TechnicianTabs', { screen: 'Active' }) },
        ]);
        return;
      }
      await acceptOfferCallable(offer.id);
      Alert.alert('Job accepted', 'Open Active to run the mission.', [
        { text: 'OK', onPress: () => navigation.navigate('TechnicianTabs', { screen: 'Active' }) },
      ]);
    } catch (e) {
      Alert.alert('Could not accept', e.message);
    }
  };

  return (
    <Screen scroll>
      <LetaButton title="← Dispatch board" variant="ghost" onPress={() => navigation.goBack()} />
      <PartnerChannelBadge offerOrTicket={offer} />
      <Text style={styles.wo}>
        {channel.workOrderLabel} {offer.partnerWorkOrderId}
      </Text>
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.meta}>
        {formatMiles(offer.distanceMi)} · {offer.payout} · SLA {offer.sla}
        {offer.urgent ? ' · Urgent' : ''}
      </Text>

      <LetaCard style={styles.liaison}>
        <Text style={styles.liaisonTitle}>Leta liaison</Text>
        <Text style={styles.liaisonBody}>{channel.liaisonNote}</Text>
      </LetaCard>

      {offer.site ? (
        <LetaCard>
          <Text style={styles.label}>Site</Text>
          <Text style={styles.body}>{offer.site}</Text>
        </LetaCard>
      ) : null}

      {offer.scopeNotes ? (
        <LetaCard>
          <Text style={styles.label}>Scope</Text>
          <Text style={styles.body}>{offer.scopeNotes}</Text>
        </LetaCard>
      ) : null}

      {offer.contactPolicy === 'poc_only' ? (
        <LetaCard style={styles.warnCard}>
          <Text style={styles.warnTitle}>POC-only site</Text>
          <Text style={styles.warnBody}>Do not call the store main line. Use the named POC or Leta dispatch voice.</Text>
        </LetaCard>
      ) : null}

      {offer.poc ? (
        <PhoneContactCard
          title="Site POC"
          name={offer.poc.name}
          role={offer.poc.role}
          phone={offer.poc.phone}
          warning="Call only this contact unless dispatch approves otherwise."
        />
      ) : null}

      {offer.dispatch ? (
        <PhoneContactCard
          title="Partner dispatch"
          name={offer.dispatch.name}
          phone={offer.dispatch.phone}
          platformCallLabel="Call dispatch on Leta (private)"
          onPlatformCall={() =>
            navigation.navigate('TicketVoiceCall', {
              sessionId: `barrister-${offer.id}`,
              ticketId: offer.id,
              title: offer.title,
            })
          }
        />
      ) : null}

      <LetaCard>
        <Text style={styles.label}>Before you accept</Text>
        {channel.contactRules.map((rule) => (
          <Text key={rule} style={styles.rule}>
            · {rule}
          </Text>
        ))}
      </LetaCard>

      <View style={styles.footer}>
        <LetaButton title="Accept Barrister job" onPress={accept} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  missing: { ...theme.typography.body, marginBottom: theme.spacing.md },
  wo: { ...theme.typography.caption, color: theme.colors.primary, fontWeight: '700' },
  title: { ...theme.typography.h1, marginTop: theme.spacing.sm },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  liaison: { backgroundColor: theme.colors.primarySurface, marginBottom: theme.spacing.md },
  liaisonTitle: { ...theme.typography.label, color: theme.colors.primary },
  liaisonBody: { ...theme.typography.bodySmall, marginTop: 6, lineHeight: 20 },
  label: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: 6 },
  body: { ...theme.typography.body },
  warnCard: { backgroundColor: theme.colors.warningBg, marginBottom: theme.spacing.md },
  warnTitle: { ...theme.typography.h3, color: theme.colors.warning },
  warnBody: { ...theme.typography.bodySmall, marginTop: 6, lineHeight: 20 },
  rule: { ...theme.typography.bodySmall, marginTop: 4, lineHeight: 20 },
  footer: { marginTop: theme.spacing.lg, marginBottom: theme.spacing.xl },
});
