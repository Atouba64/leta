import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import SignaturePad from '../../components/SignaturePad';
import { useAuth } from '../../contexts/AuthContext';
import { subscribeTechActiveTicket, appendTicketPhoto, setTicketSignature, updateTicketStatus } from '../../services/tickets';
import { requestEscalation } from '../../services/liveSession';
import { uploadTicketPhoto, uploadSignaturePng } from '../../services/storage';
import { getDemoActiveJob } from '../../services/demoActiveJob';
import { TICKET_STATUS } from '../../firebase/collections';
import { isBarristerChannel } from '../../utils/partnerChannel';
import TechPartnerActiveJob from './TechPartnerActiveJob';
import TicketThread from '../../components/TicketThread';
import theme from '../../theme';

export default function TechActiveJob() {
  const navigation = useNavigation();
  const { user, demoMode } = useAuth();
  const [job, setJob] = useState(null);
  const [sigVisible, setSigVisible] = useState(false);

  useEffect(() => {
    if (demoMode) return undefined;
    return subscribeTechActiveTicket(user.uid, setJob);
  }, [user.uid, demoMode]);

  useFocusEffect(
    useCallback(() => {
      if (demoMode) setJob(getDemoActiveJob());
    }, [demoMode]),
  );

  if (!job) {
    return (
      <Screen>
        <Text style={styles.empty}>No active job. Accept an offer on Dispatch.</Text>
      </Screen>
    );
  }

  if (isBarristerChannel(job)) {
    return <TechPartnerActiveJob job={job} />;
  }

  const addPhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Camera permission required');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (result.canceled) return;

    const uri = result.assets[0].uri;
    if (demoMode) {
      Alert.alert('Photo captured', 'Would upload to Firebase Storage in production.');
      return;
    }
    const url = await uploadTicketPhoto(job.id, uri, 'proof');
    await appendTicketPhoto(job.id, url);
    Alert.alert('Uploaded', 'Proof photo saved to ticket.');
  };

  const escalate = async () => {
    try {
      const session = await requestEscalation(job.id);
      Alert.alert('Overwatch requested', `Session ${session.sessionId} — remote expert notified.`);
    } catch (e) {
      Alert.alert('Escalation failed', e.message);
    }
  };

  const onSignature = async (dataUrl) => {
    if (demoMode) {
      Alert.alert('Signed', 'Demo complete.');
      return;
    }
    const url = await uploadSignaturePng(job.id, dataUrl);
    await setTicketSignature(job.id, url);
    Alert.alert('Job complete', 'Customer signature and close-out recorded.');
  };

  return (
    <Screen scroll>
      <StatusBadge status={job.status} />
      <Text style={styles.title}>{job.title}</Text>

      <LetaCard>
        <Text style={styles.section}>Access</Text>
        <Text>{job.accessNotes || job.contact || 'See ticket details'}</Text>
        {job.partnerWorkOrderId ? (
          <Text style={styles.partnerWo}>Partner WO #{job.partnerWorkOrderId}</Text>
        ) : null}
      </LetaCard>

      {job.partnerId || job.partnerWorkOrderId || demoMode ? (
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
      ) : null}

      <LetaButton title="Mark en route" variant="secondary" onPress={() => !demoMode && updateTicketStatus(job.id, TICKET_STATUS.EN_ROUTE)} />
      <LetaButton title="Add proof photo" variant="secondary" onPress={addPhoto} />
      <LetaButton title="Request remote expert (Leta Live)" onPress={escalate} />
      <LetaButton title="Customer signature & complete" onPress={() => setSigVisible(true)} />

      <SignaturePad visible={sigVisible} onClose={() => setSigVisible(false)} onSave={onSignature} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { ...theme.typography.body, color: theme.colors.textSoft, marginTop: theme.spacing.xl },
  title: { ...theme.typography.h1, marginTop: theme.spacing.md, marginBottom: theme.spacing.md },
  section: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: 8 },
  partnerWo: { ...theme.typography.caption, color: theme.colors.primary, marginTop: 8, fontWeight: '600' },
});
