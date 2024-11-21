// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Welcome from './src/components/Welcome';
import LogRes from './src/components/LogRes';
import LoginPage from './src/components/LoginPage';
import RegisterForm from './src/components/RegisterForm';
import ForgotPasswordScreen from './src/components/ForgotPasswordScreen';
import CreateNewPasswordScreen from './src/components/CreateNewPasswordScreen';

// Import Firebase (if needed directly in this file for other functionality)
import { auth } from './src/config/firebase'; // Adjust the path as needed

// Create Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LogRes" component={LogRes} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterForm" component={RegisterForm} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
