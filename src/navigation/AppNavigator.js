import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import MainScreen from '../screens/MainScreen';
import InstituteDetailsScreen from '../screens/InstituteDetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ApplicationForm from '../screens/ApplicationForm';
import AdviserChat from '../screens/AdviserChat';
import EventsScreen from '../screens/EventsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const v = await require('@react-native-async-storage/async-storage').default.getItem('hasSeenOnboarding');
        setShowOnboarding(!v);
      } catch {
        setShowOnboarding(true);
      }
    })();
  }, []);

  // Show loading screen while checking authentication
  if (isLoading) {
    return null; // You can add a loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={showOnboarding ? "Onboarding" : (isAuthenticated ? "Main" : "SignIn")}
        screenOptions={{
          headerShown: false,
        }}
      >
        {showOnboarding && (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="InstitutionDetails"
              component={InstituteDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Apply"
              component={ApplicationForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chat"
              component={AdviserChat}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Events"
              component={EventsScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
