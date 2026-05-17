import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';

export default function LetaButton({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
}) {
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isDanger = variant === 'danger';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isSecondary && styles.secondary,
        isGhost && styles.ghost,
        isDanger && styles.danger,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary || isGhost ? theme.colors.primary : theme.colors.white} />
      ) : (
        <Text
          style={[
            styles.label,
            (isSecondary || isGhost) && styles.labelSecondary,
            isDanger && styles.labelDanger,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: theme.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  secondary: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  label: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  labelSecondary: {
    color: theme.colors.primary,
  },
  labelDanger: {
    color: theme.colors.white,
  },
});
