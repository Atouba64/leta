import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import theme from '../theme';
import { isFirebaseConfigured } from '../config/env';
import { env } from '../config/env';

export default function LetaMap({
  center,
  markers = [],
  style,
  showsUserLocation = false,
}) {
  const region = {
    latitude: center?.lat ?? 33.749,
    longitude: center?.lng ?? -84.388,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  const hasMapsKey = Boolean(env.googleMapsApiKey) || Platform.OS === 'ios';

  if (!center && !markers.length) {
    return (
      <View style={[styles.placeholder, style]}>
        <Text style={styles.placeholderText}>Map unavailable</Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrap, style]}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={region}
        showsUserLocation={showsUserLocation}
        showsMyLocationButton
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            title={m.title}
            description={m.description}
            pinColor={m.pinColor || theme.colors.primary}
          />
        ))}
      </MapView>
      {!isFirebaseConfigured() || !hasMapsKey ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Add EXPO_PUBLIC_GOOGLE_MAPS_API_KEY for production maps</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: theme.radii.lg, overflow: 'hidden', minHeight: 200 },
  map: { width: '100%', height: '100%', minHeight: 200 },
  placeholder: {
    minHeight: 200,
    backgroundColor: theme.colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.lg,
  },
  placeholderText: { color: theme.colors.textSoft },
  banner: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.92)',
    padding: 8,
    borderRadius: 8,
  },
  bannerText: { fontSize: 11, color: theme.colors.textSoft, textAlign: 'center' },
});
