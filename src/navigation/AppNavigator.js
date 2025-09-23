import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import MainScreen from '../screens/MainScreen';
import InstituteDetailsScreen from '../screens/InstituteDetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ApplicationForm from '../screens/ApplicationForm';
// import AdviserChat from '../screens/AdviserChat';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
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
         {/* <Stack.Screen
          name="Chat"
          component={AdviserChat}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
