import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from './Screen';
import LogoMark from './LogoMark';
import ProfileMenuList from './ProfileMenuList';
import LetaButton from './LetaButton';
import LetaCard from './LetaCard';
import { ROLES, useAuth } from '../contexts/AuthContext';
import { useTechOnboarding } from '../hooks/useTechOnboarding';
import { getProfileMenuItems, getRoleLabel } from '../navigation/profileMenuConfig';
import { navigateProfileItem } from '../navigation/navigateProfile';
import theme from '../theme';

export default function ProfileScreenLayout({ accentColor }) {
  const navigation = useNavigation();
  const auth = useAuth();
  const { user, role, demoMode } = auth;
  const items = getProfileMenuItems(role);
  const { complete: onboardingComplete } = useTechOnboarding();
  const showOnboardingAlert = role === ROLES.FIELD_TECH && !onboardingComplete;

  return (
    <Screen scroll>
      <LogoMark size={44} />
      <Text style={styles.name}>{user?.displayName}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Text style={[styles.role, accentColor ? { color: accentColor } : null]}>{getRoleLabel(role)}</Text>
      {demoMode ? <Text style={styles.badge}>Demo mode</Text> : null}

      {showOnboardingAlert ? (
        <LetaCard style={styles.alertCard}>
          <Text style={styles.alertTitle}>Onboarding required</Text>
          <Text style={styles.alertSub}>Complete the web application before dispatch unlocks.</Text>
          <LetaButton title="Complete onboarding" onPress={() => navigation.navigate('TechOnboarding')} />
        </LetaCard>
      ) : null}

      <ProfileMenuList items={items} onPressItem={(item) => navigateProfileItem(item, auth)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: { ...theme.typography.h2, marginTop: theme.spacing.md },
  email: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 4 },
  role: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: theme.spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  alertCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.warningBg,
    borderColor: theme.colors.warning,
    borderWidth: 1,
  },
  alertTitle: { ...theme.typography.h3 },
  alertSub: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginTop: 6,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
});
