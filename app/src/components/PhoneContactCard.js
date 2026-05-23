import React from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LetaButton from './LetaButton';
import LetaCard from './LetaCard';
import theme from '../theme';

function dial(phone, label) {
  const cleaned = (phone || '').replace(/[^\d+]/g, '');
  if (!cleaned) {
    Alert.alert('No number', `${label} phone not on file — use in-app message or dispatch voice.`);
    return;
  }
  Linking.openURL(`tel:${cleaned}`).catch(() => Alert.alert('Could not open phone app'));
}

/**
 * Phone-first contact row for partner dispatch workflows.
 */
export default function PhoneContactCard({
  title,
  name,
  role,
  phone,
  onPlatformCall,
  platformCallLabel = 'Call dispatch on Leta',
  warning,
}) {
  return (
    <LetaCard style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Ionicons name="person-circle-outline" size={28} color={theme.colors.primary} />
        <View style={styles.meta}>
          <Text style={styles.name}>{name}</Text>
          {role ? <Text style={styles.role}>{role}</Text> : null}
          {phone ? <Text style={styles.phone}>{phone}</Text> : null}
        </View>
      </View>
      {warning ? <Text style={styles.warn}>{warning}</Text> : null}
      <View style={styles.actions}>
        {phone ? (
          <LetaButton title="Call POC" variant="secondary" onPress={() => dial(phone, name)} />
        ) : null}
        {onPlatformCall ? (
          <LetaButton title={platformCallLabel} onPress={onPlatformCall} />
        ) : null}
      </View>
    </LetaCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: theme.spacing.md },
  title: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: theme.spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  meta: { flex: 1 },
  name: { ...theme.typography.h3 },
  role: { ...theme.typography.caption, color: theme.colors.textSoft },
  phone: { ...theme.typography.body, fontWeight: '600', marginTop: 4 },
  warn: {
    ...theme.typography.caption,
    color: theme.colors.warning,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    lineHeight: 18,
  },
  actions: { gap: theme.spacing.sm, marginTop: theme.spacing.sm },
});
