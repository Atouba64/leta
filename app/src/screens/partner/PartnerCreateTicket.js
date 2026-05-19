import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import { useAuth } from '../../contexts/AuthContext';
import { createPartnerTicket } from '../../services/partnerTickets';
import theme from '../../theme';

export default function PartnerCreateTicket({ navigation }) {
  const { user, profile, demoMode } = useAuth();
  const partnerId = profile?.tenantId || user?.uid;
  const [partnerWorkOrderId, setPartnerWorkOrderId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pocName, setPocName] = useState('');
  const [pocPhone, setPocPhone] = useState('');
  const [site, setSite] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!title.trim() || !site.trim()) {
      Alert.alert('Required', 'Title and site address are required.');
      return;
    }
    setSubmitting(true);
    try {
      if (demoMode) {
        Alert.alert('Created (demo)', 'Work order would dispatch to Georgia techs.');
        navigation.goBack();
        return;
      }
      const { id } = await createPartnerTicket(partnerId, user.uid, {
        partnerWorkOrderId: partnerWorkOrderId.trim(),
        title: title.trim(),
        description: description.trim(),
        partnerOrgName: profile?.displayName || 'Partner',
        address: { formatted: site.trim(), lat: 33.75, lng: -84.39 },
        poc: { name: pocName.trim(), phone: pocPhone.trim() },
        contactPolicy: 'poc_only',
        accessNotes: pocName ? `Ask for POC: ${pocName.trim()}` : '',
      });
      navigation.replace('PartnerTicketDetail', { ticketId: id, title: title.trim() });
    } catch (e) {
      Alert.alert('Could not create', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen scroll>
      <Text style={styles.title}>New work order</Text>
      <Text style={styles.sub}>Creates a Leta ticket — techs are matched in Georgia; comms stay on the ticket thread.</Text>

      <Field label="Your work order #" value={partnerWorkOrderId} onChangeText={setPartnerWorkOrderId} placeholder="BAM-CRDL-88421" />
      <Field label="Title" value={title} onChangeText={setTitle} placeholder="Cradlepoint connectivity" />
      <Field label="Site address" value={site} onChangeText={setSite} placeholder="City, GA" />
      <Field label="POC name" value={pocName} onChangeText={setPocName} placeholder="Brad" />
      <Field label="POC phone" value={pocPhone} onChangeText={setPocPhone} placeholder="Optional" />
      <Field label="Scope / notes" value={description} onChangeText={setDescription} placeholder="POC only, roof possible…" multiline />

      <LetaButton title="Submit & open thread" onPress={onSubmit} disabled={submitting} />
    </Screen>
  );
}

function Field({ label, multiline, ...props }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMulti]}
        placeholderTextColor={theme.colors.muted}
        {...props}
        multiline={multiline}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginBottom: theme.spacing.sm },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.lg, lineHeight: 20 },
  label: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: 6, marginTop: theme.spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: 12,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  inputMulti: { minHeight: 88, textAlignVertical: 'top' },
});
