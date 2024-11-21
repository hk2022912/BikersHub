import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import necessary Firebase function
import { auth } from '../config/firebase'; // Use this single import for `auth`



const handleRegister = async () => {
  if (validateForm()) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      Alert.alert('Success', `Account created for ${user.email}!`);
      navigation.navigate('LoginPage'); // Redirect to login page after successful registration
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    }
  }
};




const RegisterForm = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = form;

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // Registration logic here
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("LoginPage");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Enter Your Personal Information</Text>

        <View style={styles.form}>
          {/* Full Name Input */}
          <InputField
            label="Full Name"
            value={form.fullName}
            onChangeText={(text) => handleInputChange("fullName", text)}
            placeholder="Enter your Name"
          />

          {/* Email Input */}
          <InputField
            label="Email Address"
            value={form.email}
            onChangeText={(text) => handleInputChange("email", text)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          {/* Password Input */}
          <PasswordField
            label="Password"
            value={form.password}
            onChangeText={(text) => handleInputChange("password", text)}
            placeholder="Enter your password"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          {/* Confirm Password Input */}
          <PasswordField
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            placeholder="Enter confirm password"
            showPassword={showConfirmPassword}
            togglePasswordVisibility={toggleConfirmPasswordVisibility}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.buttonSubmit} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Login Redirect */}
        <Text style={styles.redirectText}>
          Already have an account?{" "}
          <Text style={styles.redirectLink} onPress={() => navigation.navigate("LoginPage")}>
            Login
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputField = ({ label, value, onChangeText, placeholder, keyboardType = "default" }) => (
  <View style={styles.inputField}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      keyboardType={keyboardType}
    />
  </View>
);

const PasswordField = ({
  label,
  value,
  onChangeText,
  placeholder,
  showPassword,
  togglePasswordVisibility,
}) => (
  <View style={styles.inputField}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.passwordWrapper}>
      <TextInput
        style={[styles.input, styles.passwordInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
      <Image
  source={
    showPassword
      ? require('../../assets/img/eyeOpen.png')
      : require('../../assets/img/eyeClose.png')
  }
  style={styles.eyeIcon}
/>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    marginTop: 20,
  },
  inputField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  input: {
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 40,
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
    top: 8,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  buttonSubmit: {
    height: 48,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  redirectText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
  },
  redirectLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default RegisterForm;
