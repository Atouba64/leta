import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

export default function ProfileMenuList({ items, onPressItem }) {
  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => [
            styles.row,
            index === items.length - 1 && styles.rowLast,
            pressed && styles.rowPressed,
          ]}
          onPress={() => onPressItem(item)}
          accessibilityRole="button"
          accessibilityLabel={item.label}
        >
          <View style={[styles.iconWrap, item.type === 'action' && styles.iconWrapDanger]}>
            <Ionicons
              name={item.icon}
              size={22}
              color={item.type === 'action' ? theme.colors.danger : theme.colors.primary}
            />
          </View>
          <View style={styles.textWrap}>
            <Text style={[styles.label, item.type === 'action' && styles.labelDanger]}>{item.label}</Text>
            {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
          </View>
          {item.type === 'action' ? null : (
            <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    marginTop: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowPressed: {
    backgroundColor: theme.colors.primarySurface,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapDanger: {
    backgroundColor: theme.colors.dangerBg,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  labelDanger: {
    color: theme.colors.danger,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSoft,
    marginTop: 2,
    lineHeight: 18,
  },
});
