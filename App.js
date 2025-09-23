/**
 * Admision App
 * React Native Application for Admission Management
 *
 * @format
 */

import React from 'react';
import { enableScreens } from 'react-native-screens';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

enableScreens(true);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
