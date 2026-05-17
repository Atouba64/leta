import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import RemoteQueue from '../screens/remote/RemoteQueue';
import RemoteSession from '../screens/remote/RemoteSession';
import RemoteProfile from '../screens/remote/RemoteProfile';
import HelpScreen from '../screens/shared/HelpScreen';
import AccountDetailsScreen from '../screens/shared/AccountDetailsScreen';
import RemoteExpertDetailsScreen from '../screens/remote/RemoteExpertDetailsScreen';
import { MenuTabPlaceholder, menuTabListeners, menuTabScreenOptions } from './menuTab';
import theme from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function RemoteTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.roleAccents.remote_tech,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarIcon: ({ color, size }) => {
          const icons = { Queue: 'headset-outline', Menu: 'menu-outline', Profile: 'person-outline' };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Queue" component={RemoteQueue} />
      <Tab.Screen
        name="Menu"
        component={MenuTabPlaceholder}
        options={menuTabScreenOptions}
        listeners={menuTabListeners}
      />
      <Tab.Screen name="Profile" component={RemoteProfile} />
    </Tab.Navigator>
  );
}

export default function RemoteNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RemoteTabs" component={RemoteTabs} />
      <Stack.Screen name="RemoteSession" component={RemoteSession} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
      <Stack.Screen name="RemoteExpertDetails" component={RemoteExpertDetailsScreen} />
    </Stack.Navigator>
  );
}
