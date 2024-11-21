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
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = form;

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }

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
      Alert.alert("Success", "Registration successful!");
      navigation.navigate("LoginPage");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
            onChangeText={(text) =>
              handleInputChange("confirmPassword", text)
            }
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
          <Text
            style={styles.redirectLink}
            onPress={() => navigation.navigate("LoginPage")}
          >
            Login
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) => (
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
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.passwordToggle}
      >
        <Image
          source={
            showPassword
              ? require("../../assets/img/eyeOpen.png")
              : require("../../assets/img/eyeClose.png")
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
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginTop: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginTop: 20,
  },
  inputField: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 45,
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
    top: 10,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: "#888",
  },
  buttonSubmit: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  redirectText: {
    marginTop: 20,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  redirectLink: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
});

export default RegisterForm;
