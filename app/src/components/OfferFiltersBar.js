import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SORT_OFFERS } from '../constants/techSkills';
import theme from '../theme';

const DISTANCE_OPTIONS = [
  { label: 'Any', value: null },
  { label: '15 mi', value: 15 },
  { label: '30 mi', value: 30 },
  { label: '45 mi', value: 45 },
];

const SORT_OPTIONS = [
  { label: 'Nearest', value: SORT_OFFERS.NEAREST },
  { label: 'Pay', value: SORT_OFFERS.PAYOUT },
];

export default function OfferFiltersBar({
  maxDistanceMi,
  onMaxDistanceChange,
  sortBy,
  onSortChange,
  skillMatchOnly,
  onSkillMatchOnlyChange,
  resultCount,
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Distance</Text>
      <View style={styles.row}>
        {DISTANCE_OPTIONS.map((opt) => {
          const active = maxDistanceMi === opt.value;
          return (
            <Pressable
              key={opt.label}
              onPress={() => onMaxDistanceChange(opt.value)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.label}>Sort</Text>
      <View style={styles.row}>
        {SORT_OPTIONS.map((opt) => {
          const active = sortBy === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onSortChange(opt.value)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt.label}</Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => onSkillMatchOnlyChange(!skillMatchOnly)}
          style={[styles.chip, skillMatchOnly && styles.chipActive]}
        >
          <Text style={[styles.chipText, skillMatchOnly && styles.chipTextActive]}>My skills</Text>
        </Pressable>
      </View>
      {resultCount != null ? (
        <Text style={styles.count}>
          {resultCount} offer{resultCount === 1 ? '' : 's'} match your filters
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: theme.spacing.md },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSoft,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 4,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: { fontSize: 13, fontWeight: '600', color: theme.colors.text },
  chipTextActive: { color: theme.colors.white },
  count: {
    ...theme.typography.caption,
    color: theme.colors.muted,
    marginTop: 8,
  },
});
