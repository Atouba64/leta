import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

const ROLE_LABELS = {
  customer: 'Customer',
  field_tech: 'Field technician',
  remote_tech: 'Remote expert',
};

export default function Login({ route, navigation }) {
  const role = route.params?.role || 'customer';
  const { signIn, demoMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Email required', 'Enter your email to continue.');
      return;
    }
    if (!demoMode && password.length < 6) {
      Alert.alert('Password required', 'Use at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password || 'demo-only', role);
    } catch (e) {
      Alert.alert('Sign in failed', e.message || 'Check credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <Text style={styles.kicker}>Sign in · {ROLE_LABELS[role]}</Text>
      <Text style={styles.title}>Welcome back</Text>
      {demoMode ? (
        <Text style={styles.demo}>
          Demo mode: Firebase is not configured. Any email signs you in locally for UI testing.
        </Text>
      ) : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@company.com"
        placeholderTextColor={theme.colors.muted}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder={demoMode ? 'Optional in demo' : '••••••••'}
        placeholderTextColor={theme.colors.muted}
        value={password}
        onChangeText={setPassword}
      />

      <LetaButton title="Sign in" onPress={onSubmit} loading={loading} style={styles.cta} />
      <LetaButton
        title="Create account"
        variant="ghost"
        onPress={() => navigation.navigate('SignUp', { role })}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: { ...theme.typography.caption, color: theme.colors.primary, marginTop: theme.spacing.md },
  title: { ...theme.typography.h1, color: theme.colors.ink, marginBottom: theme.spacing.md },
  demo: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    backgroundColor: theme.colors.primarySurface,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.md,
  },
  label: { ...theme.typography.label, color: theme.colors.textSoft, marginBottom: 6, marginTop: theme.spacing.sm },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    color: theme.colors.ink,
  },
  cta: { marginTop: theme.spacing.lg },
});
