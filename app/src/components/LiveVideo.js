import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RTCView } from 'react-native-webrtc';
import theme from '../theme';

export default function LiveVideo({ stream, label, mirror = false }) {
  if (!stream) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.waiting}>Waiting for video…</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <RTCView streamURL={stream.toURL()} style={styles.video} objectFit="cover" mirror={mirror} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, minHeight: 200, borderRadius: theme.radii.md, overflow: 'hidden' },
  video: { flex: 1, minHeight: 200, backgroundColor: '#0f172a' },
  placeholder: {
    flex: 1,
    minHeight: 200,
    backgroundColor: '#0f172a',
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: theme.colors.muted, fontSize: 12, marginBottom: 8 },
  waiting: { color: theme.colors.white },
});
