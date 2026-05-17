import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import theme from '../../theme';

const ISSUE_TYPES = ['Hardware repair', 'Networking', 'POS / retail', 'Server / rack', 'Smart home / AV'];

export default function CreateTicket({ navigation }) {
  const [issue, setIssue] = useState(ISSUE_TYPES[0]);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [urgency, setUrgency] = useState('scheduled');

  const submit = () => {
    if (!address.trim()) {
      Alert.alert('Address required', 'Where should the technician go?');
      return;
    }
    Alert.alert(
      'Request submitted',
      'In production this creates a Firestore ticket and starts matching. Demo flow returns you home.',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <Screen scroll>
      <Text style={styles.title}>Request service</Text>
      <Text style={styles.sub}>Estimated pricing appears before you confirm dispatch.</Text>

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
        placeholder="What is broken? Any error codes?"
        placeholderTextColor={theme.colors.muted}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Service address (Georgia)</Text>
      <TextInput
        style={styles.input}
        placeholder="Street, city, ZIP"
        placeholderTextColor={theme.colors.muted}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Timing</Text>
      <View style={styles.row}>
        <LetaButton
          title="ASAP"
          variant={urgency === 'asap' ? 'primary' : 'secondary'}
          onPress={() => setUrgency('asap')}
          style={styles.half}
        />
        <LetaButton
          title="Scheduled"
          variant={urgency === 'scheduled' ? 'primary' : 'secondary'}
          onPress={() => setUrgency('scheduled')}
          style={styles.half}
        />
      </View>

      <LetaCard style={styles.estimate}>
        <Text style={styles.estimateLabel}>Estimated range</Text>
        <Text style={styles.estimateValue}>$120 – $280</Text>
        <Text style={styles.estimateNote}>Final price depends on scope on site. Partner rate cards apply for B2B.</Text>
      </LetaCard>

      <LetaButton title="Confirm & find a tech" onPress={submit} style={styles.cta} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, color: theme.colors.ink, marginTop: theme.spacing.md },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  label: { ...theme.typography.label, color: theme.colors.textSoft, marginTop: theme.spacing.md, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 40, paddingVertical: 8, paddingHorizontal: 12 },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.ink,
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: theme.spacing.sm },
  half: { flex: 1 },
  estimate: { marginTop: theme.spacing.lg, backgroundColor: theme.colors.primarySurface },
  estimateLabel: { ...theme.typography.caption, color: theme.colors.primary },
  estimateValue: { ...theme.typography.h1, color: theme.colors.ink, marginVertical: 4 },
  estimateNote: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  cta: { marginTop: theme.spacing.lg, marginBottom: theme.spacing.xl },
});
