import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import theme from '../../theme';

export default function RemoteSession({ route, navigation }) {
  const item = route.params?.item || {};

  return (
    <Screen scroll>
      <LetaButton title="Back to queue" variant="ghost" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>Assisting {item.techName}</Text>

      <LetaCard style={styles.video}>
        <Ionicons name="videocam" size={48} color={theme.roleAccents.remote_tech} />
        <Text style={styles.videoTitle}>Leta Live</Text>
        <Text style={styles.videoSub}>WebRTC session placeholder — ticket-scoped video/audio.</Text>
      </LetaCard>

      <LetaButton title="Mark resolved" onPress={() => navigation.goBack()} />
      <LetaButton title="Needs follow-up visit" variant="secondary" onPress={() => navigation.goBack()} style={styles.secondary} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginTop: theme.spacing.md },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  video: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#ccfbf1', marginBottom: theme.spacing.lg },
  videoTitle: { ...theme.typography.h2, marginTop: theme.spacing.sm, color: '#0f766e' },
  videoSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, textAlign: 'center', marginTop: 8, paddingHorizontal: theme.spacing.md },
  secondary: { marginTop: theme.spacing.sm },
});
