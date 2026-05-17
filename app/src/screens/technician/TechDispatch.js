import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import LetaMap from '../../components/LetaMap';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentPosition } from '../../services/location';
import { setTechActive, updateTechLocation } from '../../services/users';
import { subscribePendingOffersForTech, acceptOfferCallable } from '../../services/offers';
import { DEMO_TECH_OFFERS } from '../../services/mockData';
import { formatMiles } from '../../utils/geo';
import theme from '../../theme';

export default function TechDispatch({ navigation }) {
  const { user, demoMode } = useAuth();
  const [active, setActive] = useState(false);
  const [offers, setOffers] = useState([]);
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    if (demoMode) {
      setOffers(DEMO_TECH_OFFERS);
      return undefined;
    }
    return subscribePendingOffersForTech(user.uid, setOffers);
  }, [user.uid, demoMode]);

  const toggleActive = async (value) => {
    setActive(value);
    if (demoMode) return;
    try {
      await setTechActive(user.uid, value);
      if (value) {
        const pos = await getCurrentPosition();
        setMyLocation(pos);
        await updateTechLocation(user.uid, pos);
      }
    } catch (e) {
      Alert.alert('Location', e.message);
      setActive(false);
    }
  };

  const accept = async (offerId) => {
    try {
      await acceptOfferCallable(offerId);
      Alert.alert('Job accepted', 'Open the Active tab to run the mission.', [
        { text: 'OK', onPress: () => navigation.navigate('Active') },
      ]);
    } catch (e) {
      Alert.alert('Could not accept', e.message);
    }
  };

  const markers = offers
    .filter((o) => o.ticketLocation)
    .map((o, i) => ({
      id: o.id,
      lat: o.ticketLocation.lat,
      lng: o.ticketLocation.lng,
      title: `$${o.payout}`,
    }));

  return (
    <Screen scroll>
      <View style={styles.activeRow}>
        <View>
          <Text style={styles.title}>Dispatch board</Text>
          <Text style={styles.sub}>Georgia · offers when Active</Text>
        </View>
        <Switch value={active} onValueChange={toggleActive} />
      </View>

      {myLocation ? (
        <LetaMap
          center={myLocation}
          markers={markers}
          showsUserLocation
          style={styles.map}
        />
      ) : null}

      {!active ? (
        <LetaCard style={styles.offline}>
          <Text style={styles.offlineTitle}>You are offline</Text>
          <Text style={styles.offlineSub}>Toggle Active to receive offers.</Text>
        </LetaCard>
      ) : (
        offers.map((o) => (
          <LetaCard key={o.id} style={styles.offer}>
            <Text style={styles.payout}>${o.payout}</Text>
            <Text style={styles.offerTitle}>{o.title || `Ticket ${o.ticketId}`}</Text>
            <Text style={styles.offerMeta}>
              {formatMiles(o.distanceMi)} · SLA {o.sla || '4 hr'}
            </Text>
            <LetaButton title="Accept job" onPress={() => accept(o.id)} />
          </LetaCard>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  activeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...theme.typography.h2 },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  map: { height: 180, marginVertical: theme.spacing.md },
  offline: { marginTop: theme.spacing.md, backgroundColor: theme.colors.warningBg },
  offlineTitle: { ...theme.typography.h3 },
  offlineSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  offer: { marginBottom: theme.spacing.sm },
  payout: { ...theme.typography.h2, color: theme.colors.primary },
  offerTitle: { ...theme.typography.h3, marginTop: 8 },
  offerMeta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
});
