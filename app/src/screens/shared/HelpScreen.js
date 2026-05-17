import React from 'react';
import { Linking, StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import useHideTabBarOnFocus from '../../hooks/useHideTabBarOnFocus';
import LetaCard from '../../components/LetaCard';
import LogoMark from '../../components/LogoMark';
import { useAuth } from '../../contexts/AuthContext';
import theme from '../../theme';

const SITE_URL = 'https://leta.repair';
const CONTACT_URL = 'https://leta.repair/contact.html';

export default function HelpScreen() {
  useHideTabBarOnFocus();
  const { demoMode } = useAuth();

  return (
    <Screen scroll title="Help & support">
      <LogoMark size={40} />
      <Text style={styles.lead}>
        Leta connects customers, field technicians, and remote experts for onsite IT in Georgia.
      </Text>

      {demoMode ? (
        <LetaCard style={styles.card}>
          <Text style={styles.cardTitle}>Demo mode</Text>
          <Text style={styles.cardBody}>
            You are using sample data. Sign in with Firebase configured for live tickets, dispatch, and Leta Live.
          </Text>
        </LetaCard>
      ) : null}

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Get help</Text>
        <Text style={styles.cardBody}>
          Visit our site for partners, technicians, and contact options. For urgent field issues, use your active
          ticket or dispatch board in the app.
        </Text>
        <LetaButton title="Open leta.repair" onPress={() => Linking.openURL(SITE_URL)} />
        <LetaButton
          title="Contact us"
          variant="secondary"
          onPress={() => Linking.openURL(CONTACT_URL)}
          style={styles.secondBtn}
        />
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Quick tips</Text>
        <Text style={styles.bullet}>Customers: request service from Home, then track your tech on the ticket screen.</Text>
        <Text style={styles.bullet}>Field techs: turn on Active on Dispatch to receive offers near you.</Text>
        <Text style={styles.bullet}>Remote experts: pick up escalations from the Overwatch queue.</Text>
      </LetaCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lead: {
    ...theme.typography.body,
    color: theme.colors.textSoft,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },
  card: { marginBottom: theme.spacing.md },
  cardTitle: { ...theme.typography.h3, marginBottom: theme.spacing.sm },
  cardBody: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginBottom: theme.spacing.md, lineHeight: 20 },
  secondBtn: { marginTop: theme.spacing.sm },
  bullet: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
});
