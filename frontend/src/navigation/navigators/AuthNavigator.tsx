import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRoutes } from '../Routes';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} />
      <Stack.Screen name={AuthRoutes.Signup} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
