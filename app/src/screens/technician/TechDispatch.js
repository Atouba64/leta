import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import LetaMap from '../../components/LetaMap';
import OfferFiltersBar from '../../components/OfferFiltersBar';
import { useAuth } from '../../contexts/AuthContext';
import { useTechProfile } from '../../hooks/useTechProfile';
import { SORT_OFFERS } from '../../constants/techSkills';
import { getCurrentPosition } from '../../services/location';
import { setTechActive, updateTechLocation } from '../../services/users';
import { subscribePendingOffersForTech, acceptOfferCallable } from '../../services/offers';
import { DEMO_TECH_OFFERS } from '../../services/mockData';
import { filterAndSortOffers } from '../../utils/offerFilters';
import { formatMiles } from '../../utils/geo';
import TechOnboardingGate from '../../components/TechOnboardingGate';
import theme from '../../theme';

export default function TechDispatch({ navigation }) {
  const { user, demoMode } = useAuth();
  const { profile } = useTechProfile();
  const [active, setActive] = useState(false);
  const [offers, setOffers] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [maxDistanceMi, setMaxDistanceMi] = useState(profile.travelRadiusMi || 30);
  const [sortBy, setSortBy] = useState(SORT_OFFERS.NEAREST);
  const [skillMatchOnly, setSkillMatchOnly] = useState(false);

  useEffect(() => {
    if (profile.travelRadiusMi) setMaxDistanceMi(profile.travelRadiusMi);
  }, [profile.travelRadiusMi]);

  useEffect(() => {
    if (demoMode) {
      setOffers(DEMO_TECH_OFFERS);
      return undefined;
    }
    return subscribePendingOffersForTech(user.uid, setOffers);
  }, [user.uid, demoMode]);

  const filteredOffers = useMemo(
    () =>
      filterAndSortOffers(offers, {
        maxDistanceMi,
        minPayout: profile.minPayout || 0,
        skillMatchOnly,
        techSkills: profile.skillEntries,
        sortBy,
      }),
    [offers, maxDistanceMi, profile.minPayout, profile.skillEntries, skillMatchOnly, sortBy],
  );

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

  const markers = filteredOffers
    .filter((o) => o.ticketLocation)
    .map((o) => ({
      id: o.id,
      lat: o.ticketLocation.lat,
      lng: o.ticketLocation.lng,
      title: `$${o.payout}`,
    }));

  return (
    <Screen scroll>
      <TechOnboardingGate>
        <View style={styles.activeRow}>
          <View>
            <Text style={styles.title}>Dispatch board</Text>
            <Text style={styles.sub}>Filter by distance &amp; skills · you choose what to accept</Text>
          </View>
          <Switch value={active} onValueChange={toggleActive} />
        </View>

        {myLocation ? (
          <LetaMap center={myLocation} markers={markers} showsUserLocation style={styles.map} />
        ) : null}

        {active ? (
          <OfferFiltersBar
            maxDistanceMi={maxDistanceMi}
            onMaxDistanceChange={setMaxDistanceMi}
            sortBy={sortBy}
            onSortChange={setSortBy}
            skillMatchOnly={skillMatchOnly}
            onSkillMatchOnlyChange={setSkillMatchOnly}
            resultCount={filteredOffers.length}
          />
        ) : null}

        {!active ? (
          <LetaCard style={styles.offline}>
            <Text style={styles.offlineTitle}>You are offline</Text>
            <Text style={styles.offlineSub}>Toggle Active to see offers. Edit your marketplace profile to control matching.</Text>
          </LetaCard>
        ) : filteredOffers.length === 0 ? (
          <LetaCard style={styles.offline}>
            <Text style={styles.offlineTitle}>No offers match</Text>
            <Text style={styles.offlineSub}>Try widening distance or turning off “My skills”.</Text>
          </LetaCard>
        ) : (
          filteredOffers.map((o) => (
            <LetaCard key={o.id} style={styles.offer}>
              <Text style={styles.payout}>{o.payout}</Text>
              <Text style={styles.offerTitle}>{o.title || `Ticket ${o.ticketId}`}</Text>
              <Text style={styles.offerMeta}>
                {formatMiles(o.distanceMi)} · SLA {o.sla || '4 hr'}
                {o.urgent ? ' · Urgent' : ''}
              </Text>
              {o.skills?.length ? (
                <View style={styles.tags}>
                  {o.skills.map((s) => (
                    <View key={s} style={styles.tag}>
                      <Text style={styles.tagText}>{s}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
              <LetaButton title="Accept job" onPress={() => accept(o.id)} />
            </LetaCard>
          ))
        )}
      </TechOnboardingGate>
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
  offerMeta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.sm },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: theme.spacing.md },
  tag: {
    backgroundColor: theme.colors.primarySurface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radii.pill,
  },
  tagText: { fontSize: 11, fontWeight: '600', color: theme.colors.primary },
});
