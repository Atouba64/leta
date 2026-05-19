import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PartnerHome from '../screens/partner/PartnerHome';
import PartnerCreateTicket from '../screens/partner/PartnerCreateTicket';
import PartnerTicketDetail from '../screens/partner/PartnerTicketDetail';
import PartnerVoiceCall from '../screens/partner/PartnerVoiceCall';
import ProfileScreenLayout from '../components/ProfileScreenLayout';
import HelpScreen from '../screens/shared/HelpScreen';
import AccountDetailsScreen from '../screens/shared/AccountDetailsScreen';
import { openAppMenu } from './appMenuBridge';
import { menuTabOptions } from './menuTab';
import theme from '../theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PartnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
      }}
    >
      <Tab.Screen
        name="WorkOrders"
        component={PartnerHome}
        options={{
          title: 'Work orders',
          tabBarIcon: ({ color, size }) => <Ionicons name="briefcase-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenLayout}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={PartnerHome}
        listeners={{ tabPress: (e) => { e.preventDefault(); openAppMenu(); } }}
        options={menuTabOptions}
      />
    </Tab.Navigator>
  );
}

export default function PartnerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PartnerTabs" component={PartnerTabs} />
      <Stack.Screen name="PartnerCreateTicket" component={PartnerCreateTicket} />
      <Stack.Screen name="PartnerTicketDetail" component={PartnerTicketDetail} />
      <Stack.Screen name="PartnerVoiceCall" component={PartnerVoiceCall} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
    </Stack.Navigator>
  );
}
