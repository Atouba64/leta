import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { openAppMenu } from './appMenuBridge';

/** Placeholder screen for the Menu tab (never shown — tabPress opens the sheet). */
export function MenuTabPlaceholder() {
  return <View />;
}

export const menuTabScreenOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ color, size }) => <Ionicons name="menu-outline" size={size} color={color} />,
};

export const menuTabListeners = {
  tabPress: (e) => {
    e.preventDefault();
    openAppMenu();
  },
};
