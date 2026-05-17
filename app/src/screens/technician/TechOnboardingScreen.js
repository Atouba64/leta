import React, { useState } from 'react';
import { Alert, Linking, StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import { getTechOnboardingUrl, getWhatsAppRecruitUrl } from '../../config/links';
import { useAuth } from '../../contexts/AuthContext';
import { useTechOnboarding } from '../../hooks/useTechOnboarding';
import theme from '../../theme';

export default function TechOnboardingScreen() {
  const { user, demoMode } = useAuth();
  const { complete, formOpened, openForm, confirmSubmitted } = useTechOnboarding();
  const [submitting, setSubmitting] = useState(false);

  const url = getTechOnboardingUrl({
    email: user?.email,
    uid: user?.uid,
    displayName: user?.displayName,
  });

  const openWebForm = async () => {
    await openForm();
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) throw new Error('Cannot open browser');
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Open in browser',
        `Visit this link to complete onboarding:\n\n${url}`,
      );
    }
  };

  const onConfirmSubmitted = async () => {
    if (!formOpened) {
      Alert.alert(
        'Open the form first',
        'Use “Complete onboarding on web” to open the application. After you submit it, return here and confirm.',
      );
      return;
    }
    setSubmitting(true);
    try {
      await confirmSubmitted();
      Alert.alert(
        'Application recorded',
        'Thanks — our team will review your onboarding form and email you within a few business days.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (complete) {
    return (
      <Screen scroll title="Onboarding">
        <LetaCard style={styles.card}>
          <Text style={styles.doneTitle}>Onboarding submitted</Text>
          <Text style={styles.cardSub}>
            We have your application on file for {user?.email}. You will get an email when vetting is complete and
            you can receive live offers.
          </Text>
        </LetaCard>
        <LetaButton title="View application again" variant="secondary" onPress={openWebForm} />
      </Screen>
    );
  }

  const openWhatsApp = () => Linking.openURL(getWhatsAppRecruitUrl());

  return (
    <Screen scroll title="Join the crew">
      <Text style={styles.lead}>
        Before dispatch unlocks, join the <Text style={styles.strong}>Leta Tech crew</Text> — statewide in
        Georgia, from Atlanta to rural counties. WhatsApp intro in 30 seconds, then the full application on
        leta.repair (~8 min). Your schedule, your radius, 1099 field IT.
      </Text>

      <LetaCard style={styles.cardHighlight}>
        <Text style={styles.step}>Fastest</Text>
        <Text style={styles.cardTitle}>WhatsApp intro</Text>
        <Text style={styles.cardSub}>Send your name, city or county, and that you have a phone + car — we reply on chat.</Text>
        <LetaButton title="Join on WhatsApp" onPress={openWhatsApp} />
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.step}>Step 1</Text>
        <Text style={styles.cardTitle}>Full application on web</Text>
        <Text style={styles.cardSub}>About 8 minutes · use the same email as this app</Text>
        <LetaButton title="Open full application" variant="secondary" onPress={openWebForm} />
        {formOpened ? <Text style={styles.opened}>Form opened — submit it, then continue below.</Text> : null}
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.step}>Step 2</Text>
        <Text style={styles.cardTitle}>Confirm submission</Text>
        <Text style={styles.cardSub}>
          After you submit the form, tap below so the app unlocks dispatch. We match applications by email.
        </Text>
        <LetaButton
          title="I've submitted the application"
          variant="secondary"
          onPress={onConfirmSubmitted}
          disabled={!formOpened || submitting}
        />
      </LetaCard>

      {demoMode ? (
        <Text style={styles.demo}>
          Demo mode: dispatch stays locked until you confirm, so you can test this flow end to end.
        </Text>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  lead: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  strong: { fontWeight: '700', color: theme.colors.text },
  card: { marginBottom: theme.spacing.md },
  cardHighlight: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.primarySurface,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  step: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: { ...theme.typography.h3, marginTop: 4 },
  cardSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 8, marginBottom: theme.spacing.md, lineHeight: 20 },
  opened: { ...theme.typography.caption, color: theme.colors.success, marginTop: theme.spacing.sm, fontWeight: '600' },
  doneTitle: { ...theme.typography.h3, color: theme.colors.success },
  demo: { ...theme.typography.caption, color: theme.colors.muted, marginTop: theme.spacing.sm, lineHeight: 18 },
});
