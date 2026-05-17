const base = require('./app.json');

module.exports = ({ config } = {}) => {
  const mapsKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const expo = { ...base.expo, ...(config?.expo || {}) };

  return {
    ...config,
    expo: {
      ...expo,
      ios: {
        ...expo.ios,
        config: {
          ...expo.ios?.config,
          googleMapsApiKey: mapsKey,
        },
      },
      android: {
        ...expo.android,
        config: {
          ...expo.android?.config,
          googleMaps: {
            apiKey: mapsKey,
          },
        },
      },
      plugins: [
        'expo-dev-client',
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
        ...expo.extra,
        googleMapsApiKey: mapsKey,
      },
    },
  };
};
