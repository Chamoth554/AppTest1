// screens/WelcomeScreen.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput, useColorScheme, View
} from "react-native";

import type { ScreenName } from "./App";

interface Props {
  navigate: (s: ScreenName) => void;
}

const avatars = [
  require("../../assets/avatar1.png"),
  require("../../assets/avatar2.png"),
  require("../../assets/avatar3.png"),
  require("../../assets/avatar4.png"),
];

export default function WelcomeScreen({ navigate }: Props) {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme(); // "light" or "dark"
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const checkUser = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      const storedAvatar = await AsyncStorage.getItem("userAvatar");
      if (storedName && storedAvatar !== null) {
        navigate("dashboard");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleStart = async () => {
    if (!name || selectedAvatar === null) return;
    await AsyncStorage.setItem("userName", name);
    await AsyncStorage.setItem("userAvatar", String(selectedAvatar));
    navigate("dashboard");
  };

  if (loading) return null;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>Welcome!</Text>
      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        Enter your name & choose an avatar
      </Text>

      <TextInput
        placeholder="Your Name"
        placeholderTextColor={isDark ? "#aaa" : "#555"}
        value={name}
        onChangeText={setName}
        style={[styles.input, isDark && styles.inputDark]}
      />

      <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
        Choose Avatar
      </Text>

      <FlatList
        data={avatars}
        numColumns={4}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.avatarGrid}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => setSelectedAvatar(index)}
            style={({ pressed }) => [
              styles.avatarWrapper,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Image
              source={item}
              style={[
                styles.avatar,
                selectedAvatar === index && {
                  borderColor: "#667eea",
                  transform: [{ scale: 1.1 }],
                },
              ]}
            />
          </Pressable>
        )}
      />

      <Pressable
        onPress={handleStart}
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8 },
          isDark && styles.buttonDark,
        ]}
      >
        <Text style={[styles.buttonText, isDark && styles.buttonTextDark]}>
          Continue
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 10, color: "#333" },
  titleDark: { color: "#fff" },
  subtitle: { fontSize: 16, marginBottom: 12, color: "#555" },
  subtitleDark: { color: "#aaa" },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  inputDark: {
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    color: "#fff",
  },
  avatarGrid: { marginVertical: 10 },
  avatarWrapper: {
    margin: 8,
    borderRadius: 35,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "transparent",
  },
  button: {
    backgroundColor: "#667eea",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 14,
    marginTop: 20,
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom:100
  },
  buttonDark: { backgroundColor: "#4c5ddf" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  buttonTextDark: { color: "#fff" },
});
