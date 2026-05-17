import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import CustomerHome from '../screens/customer/CustomerHome';
import CreateTicket from '../screens/customer/CreateTicket';
import TicketTracking from '../screens/customer/TicketTracking';
import CustomerProfile from '../screens/customer/CustomerProfile';
import PaymentScreen from '../screens/customer/PaymentScreen';
import ServiceHistory from '../screens/customer/ServiceHistory';
import HelpScreen from '../screens/shared/HelpScreen';
import { MenuTabPlaceholder, menuTabListeners, menuTabScreenOptions } from './menuTab';
import theme from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: { borderTopColor: theme.colors.border },
        tabBarIcon: ({ color, size }) => {
          const icons = { Home: 'home-outline', Menu: 'menu-outline', Profile: 'person-outline' };
          return <Ionicons name={icons[route.name] || 'ellipse-outline'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={CustomerHome} />
      <Tab.Screen
        name="Menu"
        component={MenuTabPlaceholder}
        options={menuTabScreenOptions}
        listeners={menuTabListeners}
      />
      <Tab.Screen name="Profile" component={CustomerProfile} />
    </Tab.Navigator>
  );
}

export default function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
      <Stack.Screen name="CreateTicket" component={CreateTicket} />
      <Stack.Screen name="TicketTracking" component={TicketTracking} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' }} />
      <Stack.Screen name="ServiceHistory" component={ServiceHistory} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
}
