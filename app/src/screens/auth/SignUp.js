import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import useHideTabBarOnFocus from '../../hooks/useHideTabBarOnFocus';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

export default function SignUp({ route, navigation }) {
  useHideTabBarOnFocus();
  const role = route.params?.role || 'customer';
  const { signUp, demoMode } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Email required');
      return;
    }
    if (!demoMode && password.length < 6) {
      Alert.alert('Password', 'Use at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password || 'demo-only', displayName, role);
    } catch (e) {
      Alert.alert('Sign up failed', e.message || 'Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <Text style={styles.title}>Create your account</Text>
      {demoMode ? (
        <Text style={styles.demo}>Demo mode active — account is stored on this device only.</Text>
      ) : null}

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor={theme.colors.muted}
        value={displayName}
        onChangeText={setDisplayName}
      />

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
        placeholder="••••••••"
        placeholderTextColor={theme.colors.muted}
        value={password}
        onChangeText={setPassword}
      />

      <LetaButton title="Create account" onPress={onSubmit} loading={loading} style={styles.cta} />
      <LetaButton title="Back to sign in" variant="ghost" onPress={() => navigation.navigate('Login', { role })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...theme.typography.h1, color: theme.colors.ink, marginTop: theme.spacing.md, marginBottom: theme.spacing.md },
  demo: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
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
