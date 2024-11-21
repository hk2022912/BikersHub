import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase'; // Adjust the path as needed


const handlePasswordReset = async () => {
  if (!email) {
    Alert.alert('Validation Error', 'Please enter your email.');
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert('Success', 'Password reset instructions sent to your email.');
    navigation.goBack();
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};



const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Validation Error', 'Please enter your email.');
      return;
    }

    try {
      // Simulate API call for password reset
      const response = await fetch('https://your-api-endpoint.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password reset instructions sent to your email.');
        navigation.goBack(); // Go back to login
      } else {
        Alert.alert('Error', data.message || 'Failed to send reset instructions.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to reset your password.</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#a1a1a1"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handlePasswordReset}
      >
        <Text style={styles.resetButtonText}>Send Reset Instructions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#111',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgotPassword;
