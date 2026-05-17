import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import RoleSelection from '../screens/auth/RoleSelection';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import HelpScreen from '../screens/shared/HelpScreen';
import { MenuTabPlaceholder, menuTabListeners, menuTabScreenOptions } from './menuTab';
import theme from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.bg },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: theme.colors.bg },
      }}
    >
      <Stack.Screen name="RoleSelection" component={RoleSelection} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ title: 'Sign in' }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Create account' }} />
      <Stack.Screen name="Help" component={HelpScreen} options={{ title: 'Help & support' }} />
    </Stack.Navigator>
  );
}

function AuthTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: { borderTopColor: theme.colors.border },
        tabBarIcon: ({ color, size }) => {
          const icons = { Home: 'home-outline', Menu: 'menu-outline' };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={AuthStack} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen
        name="Menu"
        component={MenuTabPlaceholder}
        options={menuTabScreenOptions}
        listeners={menuTabListeners}
      />
    </Tab.Navigator>
  );
}

export default function AuthNavigator() {
  return <AuthTabs />;
}
