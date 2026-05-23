import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import TechDispatch from '../screens/technician/TechDispatch';
import TechActiveJob from '../screens/technician/TechActiveJob';
import TechEarnings from '../screens/technician/TechEarnings';
import TechProfile from '../screens/technician/TechProfile';
import HelpScreen from '../screens/shared/HelpScreen';
import AccountDetailsScreen from '../screens/shared/AccountDetailsScreen';
import TechCredentialsScreen from '../screens/technician/TechCredentialsScreen';
import TechOnboardingScreen from '../screens/technician/TechOnboardingScreen';
import PartnerVoiceCall from '../screens/partner/PartnerVoiceCall';
import TechPartnerOfferDetail from '../screens/technician/TechPartnerOfferDetail';
import { MenuTabPlaceholder, menuTabListeners, menuTabScreenOptions } from './menuTab';
import theme from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TechnicianTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dispatch: 'map-outline',
            Active: 'construct-outline',
            Earnings: 'wallet-outline',
            Menu: 'menu-outline',
            Profile: 'person-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dispatch" component={TechDispatch} />
      <Tab.Screen name="Active" component={TechActiveJob} />
      <Tab.Screen name="Earnings" component={TechEarnings} />
      <Tab.Screen
        name="Menu"
        component={MenuTabPlaceholder}
        options={menuTabScreenOptions}
        listeners={menuTabListeners}
      />
      <Tab.Screen name="Profile" component={TechProfile} />
    </Tab.Navigator>
  );
}

export default function TechnicianNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TechnicianTabs" component={TechnicianTabs} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
      <Stack.Screen name="TechCredentials" component={TechCredentialsScreen} />
      <Stack.Screen name="TechOnboarding" component={TechOnboardingScreen} />
      <Stack.Screen name="TicketVoiceCall" component={PartnerVoiceCall} />
      <Stack.Screen name="TechPartnerOfferDetail" component={TechPartnerOfferDetail} />
    </Stack.Navigator>
  );
}
