const base = require('./app.json');

export default ({ config }) => {
  const mapsKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return {
    ...config,
    expo: {
      ...config.expo,
      ios: {
        ...config.expo.ios,
        config: {
          ...config.expo.ios?.config,
          googleMapsApiKey: mapsKey,
        },
      },
      android: {
        ...config.expo.android,
        config: {
          ...config.expo.android?.config,
          googleMaps: {
            apiKey: mapsKey,
          },
        },
      },
      plugins: [
        'expo-location',
        'expo-image-picker',
        'expo-asset',
        [
          'expo-build-properties',
          {
            ios: { useFrameworks: 'static' },
          },
        ],
        '@config-plugins/react-native-webrtc',
      ],
      extra: {
        ...config.expo.extra,
        googleMapsApiKey: mapsKey,
      },
    },
  };
};
