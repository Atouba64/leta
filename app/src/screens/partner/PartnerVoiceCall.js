import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LiveVideo from '../../components/LiveVideo';
import theme from '../../theme';

/** Reuses Leta Live WebRTC for partner ↔ field tech voice/video on ticket. */
export default function PartnerVoiceCall({ route }) {
  const { sessionId, title } = route.params || {};

  return (
    <Screen>
      <Text style={styles.title}>{title || 'Leta voice'}</Text>
      <Text style={styles.sub}>On-platform call — logged to ticket. Personal numbers stay private.</Text>
      <LiveVideo sessionId={sessionId} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h2, marginBottom: theme.spacing.sm },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
});
