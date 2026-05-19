import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Screen from '../../components/Screen';
import LetaButton from '../../components/LetaButton';
import LetaCard from '../../components/LetaCard';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../contexts/AuthContext';
import { useTechOnboarding } from '../../hooks/useTechOnboarding';
import { useTechProfile } from '../../hooks/useTechProfile';
import {
  PROFICIENCY,
  PROFICIENCY_LABELS,
  SKILL_CATALOG,
} from '../../constants/techSkills';
import { TICKET_STATUS } from '../../services/mockData';
import theme from '../../theme';

export default function TechCredentialsScreen() {
  const navigation = useNavigation();
  const { user, demoMode } = useAuth();
  const { complete } = useTechOnboarding();
  const { profile, saveProfile, loading } = useTechProfile();
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState(null);

  const data = draft || profile;

  const toggleSkill = (catalogItem) => {
    const exists = data.skillEntries.find((e) => e.id === catalogItem.id);
    let nextEntries;
    if (exists) {
      nextEntries = data.skillEntries.filter((e) => e.id !== catalogItem.id);
    } else {
      nextEntries = [
        ...data.skillEntries,
        { id: catalogItem.id, label: catalogItem.label, proficiency: PROFICIENCY.COMFORTABLE },
      ];
    }
    setDraft({ ...data, skillEntries: nextEntries });
  };

  const cycleProficiency = (id) => {
    const order = [PROFICIENCY.LEARNING, PROFICIENCY.COMFORTABLE, PROFICIENCY.EXPERT];
    const nextEntries = data.skillEntries.map((e) => {
      if (e.id !== id) return e;
      const idx = order.indexOf(e.proficiency || PROFICIENCY.COMFORTABLE);
      return { ...e, proficiency: order[(idx + 1) % order.length] };
    });
    setDraft({ ...data, skillEntries: nextEntries });
  };

  const toggleHighlight = (id) => {
    const highlights = data.highlightSkillIds || [];
    const has = highlights.includes(id);
    const next = has ? highlights.filter((h) => h !== id) : [...highlights, id].slice(0, 5);
    setDraft({ ...data, highlightSkillIds: next });
  };

  const onSave = async () => {
    if (!data.headline?.trim()) {
      Alert.alert('Headline required', 'Add a short headline partners see — like a freelancer title.');
      return;
    }
    setSaving(true);
    try {
      await saveProfile(data);
      setDraft(null);
      Alert.alert('Profile saved', 'Partners route offers using your skills, radius, and preferences.');
    } catch (e) {
      Alert.alert('Save failed', e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!complete && !demoMode) {
    return (
      <Screen scroll title="Marketplace profile">
        <LetaCard style={styles.requiredCard}>
          <Text style={styles.requiredTitle}>Complete onboarding first</Text>
          <Text style={styles.cardSub}>
            Your freelancer-style profile is built from the web application. Finish onboarding, then edit what partners
            see here.
          </Text>
          <LetaButton title="Go to onboarding" onPress={() => navigation.navigate('TechOnboarding')} />
        </LetaCard>
      </Screen>
    );
  }

  return (
    <Screen scroll title="Marketplace profile">
      <Text style={styles.lead}>
        You control what partners see — like a freelancing profile. Hide skills you do not want, highlight specialties,
        and set how far you will drive.
      </Text>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Activation</Text>
        <View style={styles.badgeRow}>
          <StatusBadge status={complete ? TICKET_STATUS.ASSIGNED : TICKET_STATUS.PENDING} />
          <Text style={styles.statusText}>{user?.email}</Text>
        </View>
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Headline</Text>
        <Text style={styles.hint}>One line — what you want partners to remember.</Text>
        <TextInput
          style={styles.input}
          value={data.headline}
          onChangeText={(headline) => setDraft({ ...data, headline })}
          placeholder="e.g. Savannah POS & Cradlepoint specialist"
          maxLength={80}
        />
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>About you</Text>
        <Text style={styles.hint}>Pitch your experience. You can edit anytime.</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={data.bio}
          onChangeText={(bio) => setDraft({ ...data, bio })}
          placeholder="Tools you carry, brands you know, schedule limits…"
          multiline
          maxLength={600}
        />
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Skills on your profile</Text>
        <Text style={styles.hint}>Tap to add/remove. Tap level badge to cycle Learning → Comfortable → Expert. Star = highlight for partners.</Text>
        {SKILL_CATALOG.map((item) => {
          const entry = data.skillEntries.find((e) => e.id === item.id);
          const highlighted = (data.highlightSkillIds || []).includes(item.id);
          return (
            <View key={item.id} style={styles.skillRow}>
              <Pressable style={styles.skillMain} onPress={() => toggleSkill(item)}>
                <Text style={[styles.skillLabel, entry && styles.skillLabelOn]}>{item.label}</Text>
              </Pressable>
              {entry ? (
                <>
                  <Pressable onPress={() => cycleProficiency(item.id)} style={styles.levelBadge}>
                    <Text style={styles.levelText}>{PROFICIENCY_LABELS[entry.proficiency] || 'Comfortable'}</Text>
                  </Pressable>
                  <Pressable onPress={() => toggleHighlight(item.id)} style={styles.starBtn}>
                    <Text style={highlighted ? styles.starOn : styles.starOff}>{highlighted ? '★' : '☆'}</Text>
                  </Pressable>
                </>
              ) : null}
            </View>
          );
        })}
      </LetaCard>

      <LetaCard style={styles.card}>
        <Text style={styles.cardTitle}>Travel and pay floor</Text>
        <Text style={styles.hint}>Dispatch board uses your radius. Min payout filters offers in the app.</Text>
        <Text style={styles.fieldLabel}>Max travel (miles)</Text>
        <View style={styles.radiusRow}>
          {[15, 30, 45, 60].map((mi) => (
            <Pressable
              key={mi}
              onPress={() => setDraft({ ...data, travelRadiusMi: mi })}
              style={[styles.chip, data.travelRadiusMi === mi && styles.chipActive]}
            >
              <Text style={[styles.chipText, data.travelRadiusMi === mi && styles.chipTextActive]}>{mi} mi</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.fieldLabel}>Minimum pay per job ($)</Text>
        <TextInput
          style={styles.input}
          value={data.minPayout ? String(data.minPayout) : ''}
          onChangeText={(t) => setDraft({ ...data, minPayout: parseInt(t, 10) || 0 })}
          keyboardType="number-pad"
          placeholder="0 = any"
        />
      </LetaCard>

      <LetaButton title={loading ? 'Loading…' : 'Save profile'} onPress={onSave} disabled={saving || loading} />
      {draft ? <LetaButton title="Discard changes" variant="secondary" onPress={() => setDraft(null)} /> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  requiredCard: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.warningBg,
    borderColor: theme.colors.warning,
    borderWidth: 1,
  },
  requiredTitle: { ...theme.typography.h3 },
  lead: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  card: { marginBottom: theme.spacing.sm },
  cardTitle: { ...theme.typography.h3 },
  cardSub: { ...theme.typography.bodySmall, color: theme.colors.textSoft, marginTop: 8, lineHeight: 20 },
  hint: { ...theme.typography.caption, color: theme.colors.muted, marginTop: 6, marginBottom: 8 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.sm },
  statusText: { fontWeight: '600', color: theme.colors.text },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    padding: 12,
    fontSize: 15,
    color: theme.colors.text,
    backgroundColor: theme.colors.bg,
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  fieldLabel: { ...theme.typography.caption, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  skillMain: { flex: 1 },
  skillLabel: { fontSize: 15, color: theme.colors.muted },
  skillLabelOn: { color: theme.colors.text, fontWeight: '600' },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.primarySurface,
  },
  levelText: { fontSize: 11, fontWeight: '700', color: theme.colors.primary },
  starBtn: { padding: 4 },
  starOn: { fontSize: 18, color: theme.colors.primary },
  starOff: { fontSize: 18, color: theme.colors.muted },
  radiusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  chipText: { fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: theme.colors.white },
});
