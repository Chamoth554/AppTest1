// screens/LoginScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

interface Props {
  onLogin: () => void;
  navigate: (s: ScreenName) => void;
}

export default function LoginScreen({ onLogin, navigate }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, isDark && styles.containerDark]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Welcome Back!</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          Sign in to continue learning
        </Text>

        <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
          <Ionicons name="mail-outline" size={20} color={isDark ? "#ccc" : "#666"} style={styles.inputIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            value={email}
            onChangeText={setEmail}
            style={[styles.input, isDark && styles.inputDark]}
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
          <Ionicons name="lock-closed-outline" size={20} color={isDark ? "#ccc" : "#666"} style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={isDark ? "#aaa" : "#888"}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, isDark && styles.inputDark]}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isDark && styles.loginButtonDark]}
          onPress={onLogin}
        >
          <Text style={[styles.loginButtonText, isDark && styles.loginButtonTextDark]}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => navigate("settings")}>
          <Text style={[styles.signupButtonText, isDark && styles.signupButtonTextDark]}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, isDark && styles.socialButtonDark]}>
            <Ionicons name="logo-google" size={20} color="#db4437" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, isDark && styles.socialButtonDark]}>
            <Ionicons name="logo-facebook" size={20} color="#4267B2" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 30, paddingTop: 60, backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#121212" },
  content: { flex: 1 },
  title: { fontSize: 32, fontWeight: "bold", color: "#333", marginBottom: 6, textAlign: "center" },
  titleDark: { color: "#fff" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30, textAlign: "center" },
  subtitleDark: { color: "#ccc" },
  inputContainer: {
    flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 12,
    paddingHorizontal: 12, marginBottom: 18, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  inputContainerDark: { backgroundColor: "#1f1f1f", shadowOpacity: 0.2 },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, height: 48, fontSize: 16, color: "#333" },
  inputDark: { color: "#fff" },
  loginButton: {
    backgroundColor: "#667eea", borderRadius: 12, height: 50, justifyContent: "center", alignItems: "center", marginTop: 8,
  },
  loginButtonDark: { backgroundColor: "#5a67d8" },
  loginButtonText: { color: "white", fontSize: 18, fontWeight: "700" },
  loginButtonTextDark: { color: "#fff" },
  signupButton: { alignItems: "center", marginTop: 12 },
  signupButtonText: { color: "#667eea", fontSize: 15 },
  signupButtonTextDark: { color: "#9bb0ff" },
  socialContainer: { flexDirection: "row", justifyContent: "center", marginTop: 18, gap: 16 },
  socialButton: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: "white", justifyContent: "center", alignItems: "center", elevation: 2,
  },
  socialButtonDark: { backgroundColor: "#1f1f1f" },
});
