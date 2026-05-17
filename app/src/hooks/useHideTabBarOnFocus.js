import { useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

function findTabNavigator(navigation) {
  let node = navigation.getParent();
  while (node) {
    if (node.getState?.().type === 'tab') {
      return node;
    }
    node = node.getParent();
  }
  return null;
}

/** Hides the nearest ancestor bottom tab bar while this screen is focused. */
export default function useHideTabBarOnFocus() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const tab = findTabNavigator(navigation);
      if (!tab) return undefined;
      tab.setOptions({ tabBarStyle: { display: 'none' } });
      return () => tab.setOptions({ tabBarStyle: undefined });
    }, [navigation]),
  );
}
