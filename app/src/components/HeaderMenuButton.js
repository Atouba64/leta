import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { openAppMenu } from '../navigation/appMenuBridge';
import theme from '../theme';

export default function HeaderMenuButton({ color = theme.colors.primary }) {
  return (
    <Pressable
      onPress={openAppMenu}
      style={styles.btn}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel="Open menu"
    >
      <Text style={[styles.label, { color }]}>Menu</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
