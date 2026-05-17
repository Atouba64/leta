import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoleSelection from '../screens/auth/RoleSelection';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import theme from '../theme';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="RoleSelection"
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
    </Stack.Navigator>
  );
}
