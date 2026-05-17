import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LetaButton from './LetaButton';
import LetaCard from './LetaCard';
import { useTechOnboarding } from '../hooks/useTechOnboarding';
import theme from '../theme';

/** Blocks field-tech dispatch features until web onboarding is confirmed. */
export default function TechOnboardingGate({ children }) {
  const navigation = useNavigation();
  const { loading, complete, isRequired } = useTechOnboarding();

  if (!isRequired || loading || complete) {
    return children;
  }

  return (
    <>
      <LetaCard style={styles.banner}>
        <Text style={styles.bannerTitle}>Onboarding required</Text>
        <Text style={styles.bannerSub}>
          Complete the onboarding form on leta.repair (anywhere in Georgia) before you can go active or accept jobs.
        </Text>
        <LetaButton title="Continue onboarding" onPress={() => navigation.navigate('TechOnboarding')} />
      </LetaCard>
      <View style={styles.disabled}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.warningBg,
    borderColor: theme.colors.warning,
    borderWidth: 1,
  },
  bannerTitle: { ...theme.typography.h3, color: theme.colors.ink },
  bannerSub: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginTop: 8,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  disabled: {
    opacity: 0.45,
    pointerEvents: 'none',
  },
});
