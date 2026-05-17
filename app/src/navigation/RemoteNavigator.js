import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import RemoteQueue from '../screens/remote/RemoteQueue';
import RemoteSession from '../screens/remote/RemoteSession';
import RemoteProfile from '../screens/remote/RemoteProfile';
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
          const name = route.name === 'Queue' ? 'headset-outline' : 'person-outline';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Queue" component={RemoteQueue} />
      <Tab.Screen name="Profile" component={RemoteProfile} />
    </Tab.Navigator>
  );
}

export default function RemoteNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RemoteTabs" component={RemoteTabs} />
      <Stack.Screen name="RemoteSession" component={RemoteSession} />
    </Stack.Navigator>
  );
}
