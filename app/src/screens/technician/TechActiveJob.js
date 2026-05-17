import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import { DEMO_ACTIVE_JOB } from '../../services/mockData';
import theme from '../../theme';

export default function TechActiveJob({ navigation }) {
  const [job] = useState(DEMO_ACTIVE_JOB);

  const escalate = () => {
    Alert.alert(
      'Request remote expert',
      'In production this opens Leta Live (WebRTC) to a vetted overwatch tech on this ticket.',
    );
  };

  return (
    <Screen scroll>
      <StatusBadge status={job.status} />
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.meta}>{job.customer}</Text>

      <LetaCard>
        <Text style={styles.section}>Logistics</Text>
        <Text style={styles.line}>POC: {job.contact}</Text>
        <Text style={styles.line}>{job.phone}</Text>
        <Text style={styles.line}>{job.accessNotes}</Text>
      </LetaCard>

      <LetaCard>
        <Text style={styles.section}>Close-out checklist</Text>
        {job.checklist.map((c) => (
          <Text key={c.id} style={styles.check}>
            {c.done ? '✓' : '○'} {c.label}
          </Text>
        ))}
      </LetaCard>

      <LetaButton title="Request remote expert" onPress={escalate} style={styles.escalate} />
      <LetaButton title="Capture signature & complete" variant="secondary" onPress={() => Alert.alert('Complete', 'Photos + signature upload to Firebase Storage.')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, marginTop: theme.spacing.md },
  meta: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md },
  section: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: 8 },
  line: { ...theme.typography.body, marginBottom: 4 },
  check: { fontSize: 16, marginBottom: 8, color: theme.colors.ink },
  escalate: { marginTop: theme.spacing.md, marginBottom: theme.spacing.sm },
});
