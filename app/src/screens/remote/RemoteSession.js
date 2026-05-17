import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LiveVideo from '../../components/LiveVideo';
import { useWebRTC } from '../../hooks/useWebRTC';
import { joinLiveSession } from '../../services/liveSession';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

export default function RemoteSession({ route, navigation }) {
  const { sessionId, title } = route.params || {};
  const { demoMode } = useAuth();
  const [ready, setReady] = useState(demoMode);

  useEffect(() => {
    if (demoMode || !sessionId) return;
    joinLiveSession(sessionId)
      .then(() => setReady(true))
      .catch((e) => Alert.alert('Join failed', e.message));
  }, [sessionId, demoMode]);

  const { localStream, remoteStream, status, error } = useWebRTC(
    ready && !demoMode ? sessionId : null,
    { isInitiator: false },
  );

  return (
    <Screen scroll title="Leta Live" contentStyle={styles.content}>
      <LetaButton title="Back" variant="ghost" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>{title || 'Leta Live'}</Text>
      <Text style={styles.status}>Status: {demoMode ? 'demo' : status}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {demoMode ? (
        <View style={styles.demoBox}>
          <Text style={styles.demoText}>
            WebRTC requires a development build (expo run:ios / run:android). Firestore signaling is configured.
          </Text>
        </View>
      ) : (
        <View style={styles.videoRow}>
          <LiveVideo stream={remoteStream} label="Field (remote)" />
          <LiveVideo stream={localStream} label="You" mirror />
        </View>
      )}

      <LetaButton title="Mark resolved" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 48 },
  title: { ...theme.typography.h1, marginTop: theme.spacing.md },
  status: { color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  error: { color: theme.colors.danger, marginBottom: theme.spacing.md },
  videoRow: { gap: theme.spacing.md, marginBottom: theme.spacing.lg },
  demoBox: {
    backgroundColor: '#ccfbf1',
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    marginBottom: theme.spacing.lg,
  },
  demoText: { color: '#0f766e', lineHeight: 22 },
});
