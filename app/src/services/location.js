import * as Location from 'expo-location';

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentPosition() {
  const granted = await requestLocationPermission();
  if (!granted) {
    throw new Error('Location permission denied');
  }

  const pos = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
    accuracy: pos.coords.accuracy,
  };
}

export async function geocodeAddress(formatted) {
  const results = await Location.geocodeAsync(formatted);
  if (!results?.length) {
    throw new Error('Could not geocode address');
  }
  const { latitude, longitude } = results[0];
  return { lat: latitude, lng: longitude, formatted };
}
