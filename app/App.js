import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppProviders from './src/components/AppProviders';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppMenuProvider } from './src/contexts/AppMenuContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProviders>
          <AuthProvider>
            <AppMenuProvider>
              <RootNavigator />
            </AppMenuProvider>
          </AuthProvider>
        </AppProviders>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
