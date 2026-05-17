import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import LogoMark from '../../components/LogoMark';
import { ROLES } from '../../contexts/AuthContext';
import theme from '../../theme';

const ROLES_META = [
  {
    id: ROLES.CUSTOMER,
    title: 'Customer',
    subtitle: 'Request onsite IT · track your tech',
    icon: 'business-outline',
  },
  {
    id: ROLES.FIELD_TECH,
    title: 'Field technician',
    subtitle: 'Accept jobs · Georgia network',
    icon: 'hardware-chip-outline',
  },
  {
    id: ROLES.REMOTE_TECH,
    title: 'Remote expert',
    subtitle: 'Overwatch · live assist on tickets',
    icon: 'videocam-outline',
  },
];

export default function RoleSelection({ navigation }) {
  const [selected, setSelected] = useState(ROLES.CUSTOMER);

  return (
    <Screen scroll>
      <View style={styles.header}>
        <LogoMark size={52} />
        <Text style={styles.tag}>Georgia first</Text>
        <Text style={styles.title}>IT service on demand</Text>
        <Text style={styles.sub}>
          Choose how you use Leta. Partners and customers share one platform—field techs and remote experts keep jobs moving.
        </Text>
      </View>

      {ROLES_META.map((r) => {
        const active = selected === r.id;
        return (
          <LetaCard key={r.id} onPress={() => setSelected(r.id)} style={[styles.roleCard, active && styles.roleActive]}>
            <View style={styles.roleRow}>
              <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
                <Ionicons name={r.icon} size={24} color={active ? theme.colors.white : theme.colors.primary} />
              </View>
              <View style={styles.roleText}>
                <Text style={styles.roleTitle}>{r.title}</Text>
                <Text style={styles.roleSub}>{r.subtitle}</Text>
              </View>
              {active ? <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} /> : null}
            </View>
          </LetaCard>
        );
      })}

      <LetaButton title="Continue" onPress={() => navigation.navigate('Login', { role: selected })} style={styles.cta} />
      <LetaButton
        title="Create account"
        variant="secondary"
        onPress={() => navigation.navigate('SignUp', { role: selected })}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: theme.spacing.md, marginBottom: theme.spacing.lg },
  tag: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    textTransform: 'uppercase',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  title: { ...theme.typography.hero, color: theme.colors.ink, marginBottom: theme.spacing.sm },
  sub: { ...theme.typography.bodySmall, color: theme.colors.textSoft },
  roleCard: { marginBottom: theme.spacing.sm },
  roleActive: { borderColor: theme.colors.primary, borderWidth: 2 },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: { backgroundColor: theme.colors.primary },
  roleText: { flex: 1 },
  roleTitle: { ...theme.typography.h3, color: theme.colors.ink },
  roleSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 2 },
  cta: { marginTop: theme.spacing.lg, marginBottom: theme.spacing.sm },
});
