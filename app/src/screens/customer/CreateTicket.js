import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import { useAuth } from '../../contexts/AuthContext';
import { geocodeAddress } from '../../services/location';
import { createTicket } from '../../services/tickets';
import { createOffersForTicket, listActiveFieldTechs } from '../../services/offers';
import theme from '../../theme';

const ISSUE_TYPES = ['Hardware repair', 'Networking', 'POS / retail', 'Server / rack'];

export default function CreateTicket({ navigation }) {
  const { user, demoMode } = useAuth();
  const [issue, setIssue] = useState(ISSUE_TYPES[0]);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [urgency, setUrgency] = useState('scheduled');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!address.trim()) {
      Alert.alert('Address required', 'Where should the technician go?');
      return;
    }
    setLoading(true);
    try {
      let geo = { lat: 33.749, lng: -84.388, formatted: address };
      if (!demoMode) {
        geo = await geocodeAddress(address);
      }

      const pricing = { estimateMin: 120, estimateMax: 280, currency: 'usd' };
      const ticket = await createTicket(user.uid, {
        title: `${issue} — ${address.split(',')[0]}`,
        description,
        issueType: issue,
        address: geo,
        urgency,
        pricing,
      });

      if (!demoMode) {
        const techs = await listActiveFieldTechs();
        await createOffersForTicket({ id: ticket.id, address: geo, urgency }, techs);
      }

      Alert.alert('Request submitted', 'Matching field technicians in Georgia.', [
        { text: 'OK', onPress: () => navigation.navigate('CustomerTabs') },
      ]);
    } catch (e) {
      Alert.alert('Could not create ticket', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <Text style={styles.title}>Request service</Text>
      <Text style={styles.label}>Issue type</Text>
      <View style={styles.chips}>
        {ISSUE_TYPES.map((t) => (
          <LetaButton
            key={t}
            title={t}
            variant={issue === t ? 'primary' : 'secondary'}
            onPress={() => setIssue(t)}
            style={styles.chip}
          />
        ))}
      </View>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        multiline
        placeholder="What is broken?"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Service address (Georgia)</Text>
      <TextInput style={styles.input} placeholder="Street, city, ZIP" value={address} onChangeText={setAddress} />
      <View style={styles.row}>
        <LetaButton title="ASAP" variant={urgency === 'asap' ? 'primary' : 'secondary'} onPress={() => setUrgency('asap')} style={styles.half} />
        <LetaButton title="Scheduled" variant={urgency === 'scheduled' ? 'primary' : 'secondary'} onPress={() => setUrgency('scheduled')} style={styles.half} />
      </View>
      <LetaCard style={styles.estimate}>
        <Text style={styles.estimateValue}>$120 – $280 estimated</Text>
      </LetaCard>
      <LetaButton title="Confirm & find a tech" onPress={submit} loading={loading} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginTop: theme.spacing.md },
  label: { ...theme.typography.label, color: theme.colors.textSoft, marginTop: theme.spacing.md, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 40 },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    fontSize: 16,
  },
  multiline: { minHeight: 90, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  half: { flex: 1 },
  estimate: { marginVertical: theme.spacing.lg },
  estimateValue: { ...theme.typography.h3, color: theme.colors.primary },
});
