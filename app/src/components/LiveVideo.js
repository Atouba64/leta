import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supportsWebRTC } from '../utils/runtime';
import theme from '../theme';

export default function LiveVideo({ stream, label, mirror = false }) {
  if (!supportsWebRTC || !stream) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>Video in dev build only</Text>
      </View>
    );
  }

  const { RTCView } = require('react-native-webrtc');
  return (
    <View style={styles.wrap}>
      <RTCView
        streamURL={stream.toURL()}
        style={styles.video}
        objectFit="cover"
        mirror={mirror}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, borderRadius: theme.radii.lg, overflow: 'hidden', backgroundColor: '#0f172a' },
  video: { flex: 1, minHeight: 180 },
  placeholder: {
    flex: 1,
    minHeight: 180,
    backgroundColor: '#0f172a',
    borderRadius: theme.radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: { color: '#fff', fontSize: 12, padding: 8, position: 'absolute', bottom: 0, left: 0 },
  hint: { color: '#94a3b8', fontSize: 13 },
});
