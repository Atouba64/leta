import Constants from 'expo-constants';

/** True when running inside the Expo Go app from the App Store. */
export const isExpoGo = Constants.appOwnership === 'expo';

/** Custom dev build (expo run:ios / EAS development). */
export const isDevClient =
  Constants.appOwnership === 'expo' === false &&
  Constants.executionEnvironment === 'bare';

export function hasNativeModule(name) {
  try {
    const { NativeModules } = require('react-native');
    return Boolean(NativeModules[name]);
  } catch {
    return false;
  }
}

export const supportsStripe = !isExpoGo && hasNativeModule('StripeSdk');
export const supportsWebRTC = !isExpoGo;
