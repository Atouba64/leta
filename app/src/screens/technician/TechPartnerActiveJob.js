import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import SignaturePad from '../../components/SignaturePad';
import PartnerChannelBadge from '../../components/PartnerChannelBadge';
import PhoneContactCard from '../../components/PhoneContactCard';
import TicketThread from '../../components/TicketThread';
import { BARRISTER_CHANNEL } from '../../constants/partnerChannels';
import { useAuth } from '../../contexts/AuthContext';
import { TICKET_STATUS } from '../../firebase/collections';
import { appendTicketPhoto, setTicketSignature, updateTicketStatus } from '../../services/tickets';
import { requestEscalation } from '../../services/liveSession';
import { uploadTicketPhoto, uploadSignaturePng } from '../../services/storage';
import theme from '../../theme';

export default function TechPartnerActiveJob({ job }) {
  const navigation = useNavigation();
  const { demoMode } = useAuth();
  const [sigVisible, setSigVisible] = useState(false);
  const [woConfirmed, setWoConfirmed] = useState(false);
  const channel = BARRISTER_CHANNEL;
  const poc = job.poc || { name: job.contact, phone: job.phone, role: '' };

  const confirmWoOpen = () => {
    setWoConfirmed(true);
    Alert.alert('Logged', 'WO open confirmation recorded on the ticket timeline (demo).');
  };

  const addPhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Camera permission required');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (result.canceled) return;
    if (demoMode) {
      Alert.alert('Photo captured', 'Would upload to Firebase Storage in production.');
      return;
    }
    const url = await uploadTicketPhoto(job.id, result.assets[0].uri, 'proof');
    await appendTicketPhoto(job.id, url);
    Alert.alert('Uploaded', 'Proof photo saved.');
  };

  const openMaps = () => {
    const q = encodeURIComponent(job.site || job.customer || '');
    Linking.openURL(`https://maps.google.com/?q=${q}`).catch(() => {});
  };

  const escalate = async () => {
    try {
      const session = await requestEscalation(job.id);
      Alert.alert('Overwatch requested', `Session ${session.sessionId}`);
    } catch (e) {
      Alert.alert('Escalation failed', e.message);
    }
  };

  const onSignature = async (dataUrl) => {
    if (demoMode) {
      Alert.alert('Signed', 'Demo close-out complete.');
      return;
    }
    const url = await uploadSignaturePng(job.id, dataUrl);
    await setTicketSignature(job.id, url);
    Alert.alert('Job complete', 'Signature recorded.');
  };

  return (
    <Screen scroll>
      <PartnerChannelBadge offerOrTicket={job} />
      <StatusBadge status={job.status} />
      <Text style={styles.wo}>
        {channel.workOrderLabel} {job.partnerWorkOrderId}
      </Text>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.customer}>{job.customer}</Text>

      <LetaCard style={styles.liaison}>
        <Ionicons name="headset-outline" size={22} color={theme.colors.primary} />
        <View style={styles.liaisonText}>
          <Text style={styles.liaisonTitle}>Leta liaison</Text>
          <Text style={styles.liaisonBody}>{channel.liaisonNote}</Text>
        </View>
      </LetaCard>

      <LetaCard style={woConfirmed ? styles.woOk : styles.woPending}>
        <Text style={styles.label}>Before you roll</Text>
        <Text style={styles.body}>
          {woConfirmed ? '✓ WO open confirmed with dispatch' : 'Confirm this work order is still open with dispatch.'}
        </Text>
        {!woConfirmed ? (
          <LetaButton title="Confirm WO still open" variant="secondary" onPress={confirmWoOpen} />
        ) : null}
      </LetaCard>

      {job.site ? (
        <LetaCard>
          <Text style={styles.label}>Site</Text>
          <Text style={styles.body}>{job.site}</Text>
          <LetaButton title="Open in Maps" variant="ghost" onPress={openMaps} />
        </LetaCard>
      ) : null}

      {job.accessNotes ? (
        <LetaCard>
          <Text style={styles.label}>Access & scope</Text>
          <Text style={styles.body}>{job.accessNotes}</Text>
        </LetaCard>
      ) : null}

      <PhoneContactCard
        title="Site POC"
        name={poc.name}
        role={poc.role}
        phone={poc.phone}
        warning={job.contactPolicy === 'poc_only' ? 'POC only — no store main line' : undefined}
      />

      <PhoneContactCard
        title="Partner dispatch"
        name={job.dispatch?.name || 'Barrister dispatch'}
        phone={job.dispatch?.phone}
        platformCallLabel="Call dispatch on Leta"
        onPlatformCall={() =>
          navigation.navigate('TicketVoiceCall', {
            sessionId: `barrister-active-${job.id}`,
            ticketId: job.id,
            title: job.title,
          })
        }
      />

      <TicketThread
        ticketId={job.id}
        ticketTitle={job.title}
        compact
        onJoinVoiceCall={(data) =>
          navigation.navigate('TicketVoiceCall', {
            sessionId: data.sessionId,
            ticketId: job.id,
            title: job.title,
          })
        }
      />

      <LetaCard>
        <Text style={styles.label}>Field actions</Text>
        <View style={styles.actions}>
          <LetaButton
            title="Mark en route"
            variant="secondary"
            onPress={() => !demoMode && updateTicketStatus(job.id, TICKET_STATUS.EN_ROUTE)}
          />
          <LetaButton title="On site" variant="secondary" onPress={() => !demoMode && updateTicketStatus(job.id, TICKET_STATUS.ON_SITE)} />
          <LetaButton title="Add proof photo" variant="secondary" onPress={addPhoto} />
          <LetaButton title="Request remote expert" onPress={escalate} />
          <LetaButton title="Customer signature & complete" onPress={() => setSigVisible(true)} />
        </View>
      </LetaCard>

      <SignaturePad visible={sigVisible} onClose={() => setSigVisible(false)} onSave={onSignature} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  wo: { ...theme.typography.caption, color: theme.colors.primary, fontWeight: '700', marginTop: theme.spacing.sm },
  title: { ...theme.typography.h1, marginTop: 4 },
  customer: { ...theme.typography.body, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  liaison: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.primarySurface,
    marginBottom: theme.spacing.md,
  },
  liaisonText: { flex: 1 },
  liaisonTitle: { ...theme.typography.label, color: theme.colors.primary },
  liaisonBody: { ...theme.typography.bodySmall, marginTop: 4, lineHeight: 20 },
  woPending: { backgroundColor: theme.colors.warningBg, marginBottom: theme.spacing.md },
  woOk: { backgroundColor: theme.colors.successBg, marginBottom: theme.spacing.md },
  label: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: 6 },
  body: { ...theme.typography.body, lineHeight: 22 },
  actions: { gap: theme.spacing.sm, marginTop: theme.spacing.sm },
});
