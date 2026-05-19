import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LetaButton from './LetaButton';
import LetaCard from './LetaCard';
import { useAuth } from '../contexts/AuthContext';
import { MESSAGE_TYPE } from '../firebase/collections';
import { subscribeTicketMessages, sendTicketMessage } from '../services/ticketMessages';
import { startPlatformVoiceCall } from '../services/ticketChannel';
import theme from '../theme';

const DEMO_THREAD = [
  {
    id: 'm1',
    senderRole: 'partner_dispatcher',
    senderLabel: 'Partner dispatch',
    body: 'Work order on Leta — use this thread for updates. POC is Brad only.',
    type: MESSAGE_TYPE.SYSTEM,
  },
  {
    id: 'm2',
    senderRole: 'field_tech',
    senderLabel: 'You',
    body: 'En route, ETA 18 min. Will not call store main line.',
    type: MESSAGE_TYPE.TEXT,
  },
];

/**
 * Ticket-scoped messaging — partner ↔ tech stay on Leta (audit trail, no ops relay).
 */
export default function TicketThread({
  ticketId,
  ticketTitle,
  onJoinVoiceCall,
  showVoiceCall = true,
  compact = false,
}) {
  const { user, role, demoMode } = useAuth();
  const [messages, setMessages] = useState(demoMode ? DEMO_THREAD : []);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (demoMode || !ticketId) {
      setMessages(demoMode ? DEMO_THREAD : []);
      return undefined;
    }
    return subscribeTicketMessages(ticketId, setMessages);
  }, [ticketId, demoMode]);

  const displayName = user?.displayName || 'Leta user';

  const onSend = async () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    if (demoMode) {
      setMessages((prev) => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          senderRole: role,
          senderLabel: displayName,
          body: text,
          type: MESSAGE_TYPE.TEXT,
        },
      ]);
      return;
    }
    setSending(true);
    try {
      await sendTicketMessage(ticketId, {
        senderId: user.uid,
        senderRole: role,
        senderLabel: displayName,
        body: text,
      });
    } catch (e) {
      Alert.alert('Message failed', e.message);
    } finally {
      setSending(false);
    }
  };

  const onVoice = async () => {
    try {
      const data = await startPlatformVoiceCall(ticketId, {
        uid: user.uid,
        role,
        displayName,
      });
      if (onJoinVoiceCall) {
        onJoinVoiceCall(data);
      } else {
        Alert.alert('Voice call', 'Session ready — open Leta Live to talk on-platform.');
      }
    } catch (e) {
      Alert.alert('Call failed', e.message);
    }
  };

  return (
    <LetaCard style={[styles.card, compact && styles.cardCompact]}>
      <View style={styles.header}>
        <Ionicons name="chatbubbles-outline" size={20} color={theme.colors.primary} />
        <Text style={styles.title}>Leta thread</Text>
      </View>
      {!compact ? (
        <Text style={styles.hint}>
          Message {ticketTitle ? `re: ${ticketTitle}` : 'on this ticket'} — logged for billing & QA. Staying here
          unlocks faster payout and partner trust scores.
        </Text>
      ) : null}

      <View style={styles.feed}>
        {messages.length === 0 ? (
          <Text style={styles.empty}>No messages yet. Say hello to your partner contact.</Text>
        ) : (
          messages.map((m) => {
            const mine = m.senderId === user?.uid || (demoMode && m.senderRole === role);
            return (
              <View key={m.id} style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}>
                <Text style={styles.sender}>{m.senderLabel || m.senderRole}</Text>
                <Text style={styles.body}>{m.body}</Text>
              </View>
            );
          })
        )}
      </View>

      {showVoiceCall ? (
        <LetaButton
          title="Voice call via Leta"
          variant="secondary"
          onPress={onVoice}
          style={styles.voiceBtn}
        />
      ) : null}

      <View style={styles.compose}>
        <TextInput
          style={styles.input}
          placeholder="Type a message…"
          placeholderTextColor={theme.colors.muted}
          value={draft}
          onChangeText={setDraft}
          multiline
        />
        <LetaButton title="Send" onPress={onSend} disabled={sending} style={styles.sendBtn} />
      </View>
    </LetaCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: theme.spacing.md },
  cardCompact: { marginTop: theme.spacing.sm },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  title: { ...theme.typography.h3 },
  hint: { ...theme.typography.caption, color: theme.colors.textSoft, marginBottom: theme.spacing.sm, lineHeight: 18 },
  feed: { maxHeight: 220, marginBottom: theme.spacing.sm },
  empty: { ...theme.typography.bodySmall, color: theme.colors.muted, fontStyle: 'italic' },
  bubble: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '92%',
  },
  bubbleMine: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primarySurface,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  bubbleTheirs: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  sender: { ...theme.typography.caption, color: theme.colors.primary, fontWeight: '700', marginBottom: 4 },
  body: { ...theme.typography.bodySmall, color: theme.colors.text, lineHeight: 20 },
  voiceBtn: { marginBottom: theme.spacing.sm },
  compose: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: theme.colors.borderSubtle,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...theme.typography.bodySmall,
    color: theme.colors.text,
  },
  sendBtn: { minWidth: 72 },
});
