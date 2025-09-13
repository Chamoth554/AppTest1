// screens/SettingsScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

const { width } = Dimensions.get("window");

interface Props {
  navigate: (s: ScreenName) => void;
}

export default function SettingsScreen({ navigate }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [avatarIndex, setAvatarIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempAvatarIndex, setTempAvatarIndex] = useState<number | null>(null);

  const avatars = [
    require("../../assets/avatar1.png"),
    require("../../assets/avatar2.png"),
    require("../../assets/avatar3.png"),
    require("../../assets/avatar4.png"),
  ];

  // Load name and avatar from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      const storedAvatar = await AsyncStorage.getItem("userAvatar");
      if (storedName) {
        setName(storedName);
        setTempName(storedName);
      }
      if (storedAvatar !== null) {
        const idx = Number(storedAvatar);
        setAvatarIndex(idx);
        setTempAvatarIndex(idx);
      }
    };
    loadUser();
  }, []);

  const saveProfile = async () => {
    setName(tempName);
    setAvatarIndex(tempAvatarIndex);
    await AsyncStorage.setItem("userName", tempName);
    if (tempAvatarIndex !== null)
      await AsyncStorage.setItem("userAvatar", tempAvatarIndex.toString());
    setIsEditing(false);
  };

  const settingsItems = [
    { title: "Language", icon: "language", type: "option", value: "English" },
    { title: "Daily Notifications", icon: "notifications-outline", type: "toggle" },
    { title: "Theme", icon: isDark ? "moon" : "sunny", type: "theme" },
    { title: "FAQ", icon: "help-circle-outline", type: "link" },
    { title: "Contact Us", icon: "mail-outline", type: "link" },
  ];

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.containerDark]}>
        <TouchableOpacity onPress={() => navigate("dashboard")}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={isDark ? "#fff" : "#333"}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Card */}
      <View style={[styles.profileCard, isDark && styles.profileCardDark]}>
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Avatar */}
        {isEditing ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {avatars.map((avt, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setTempAvatarIndex(idx)}
              >
                <Image
                  source={avt}
                  style={[
                    styles.avatar,
                    tempAvatarIndex === idx && styles.selectedAvatar,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Image
            source={
              avatarIndex !== null
                ? avatars[avatarIndex]
                : { uri: "https://i.pravatar.cc/1" }
            }
            style={styles.avatar}
          />
        )}

        {/* Name */}
        {isEditing ? (
          <TextInput
            value={tempName}
            onChangeText={setTempName}
            style={[
              styles.nameInput,
              isDark && { color: "#fff", borderColor: "#fff" },
            ]}
          />
        ) : (
          <Text style={[styles.profileName, isDark && styles.profileNameDark]}>
            {name || "Student"}
          </Text>
        )}

        {/* Korean Vibes */}
        <Text
          style={[styles.profileEmail, isDark && styles.profileEmailDark]}
        >
          Korean Vibes 🇰🇷 / 한국어 느낌 😎
        </Text>

        {/* Save Button */}
        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Settings List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {settingsItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.card,
              isDark && styles.cardDark,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.4)",
              },
            ]}
            activeOpacity={0.8}
            onPress={() => item.type === "theme" && toggleTheme()}
          >
            <View style={styles.cardLeft}>
              <Ionicons name={item.icon as any} size={24} color="#FFD700" />
              <Text style={[styles.cardText, isDark && styles.cardTextDark]}>
                {item.title}
              </Text>
            </View>

            <View style={styles.cardRight}>
              {item.type === "option" && (
                <Text style={[styles.cardValue, isDark && styles.cardValueDark]}>
                  {item.value}
                </Text>
              )}
              {item.type === "toggle" && (
                <View style={[styles.toggle, isDark && styles.toggleDark]}>
                  <View style={[styles.thumb, isDark && styles.thumbDark]} />
                </View>
              )}
              {item.type === "theme" && (
                <Ionicons
                  name={isDark ? "moon" : "sunny"}
                  size={20}
                  color="#FFD700"
                />
              )}
              {item.type === "link" && (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={isDark ? "#ccc" : "#666"}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Logout Button 
        <TouchableOpacity
          style={[styles.logoutButton, isDark && styles.logoutButtonDark]}
          onPress={() => navigate("welcome")}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>*/}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.rightsText, isDark && styles.rightsTextDark]}>
          All rights reserved || Chamoth Anuruddha
        </Text>

        <Text style={[styles.rightsTexta, isDark && styles.rightsTextDark]}>
          @2025
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  containerDark: { backgroundColor: "#121212" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#333" },
  headerTitleDark: { color: "#fff" },

  profileCard: {
    alignItems: "center",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  profileCardDark: {
    backgroundColor: "rgba(255,255,255,0.05)",
    shadowOpacity: 0.3,
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  selectedAvatar: { borderWidth: 2, borderColor: "#667eea" },
  profileName: { fontSize: 18, fontWeight: "700", color: "#333" },
  profileNameDark: { color: "#fff" },
  nameInput: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "#333",
    marginBottom: 8,
    color: "#333",
    width: width * 0.6,
  },
  profileEmail: { fontSize: 14, color: "#666" },
  profileEmailDark: { color: "#ccc" },

  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#667eea",
    padding: 6,
    borderRadius: 12,
    zIndex: 10,
  },
  saveButton: {
    backgroundColor: "#4ade80",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 8,
  },
  saveText: { color: "#fff", fontWeight: "700" },

  scrollContainer: { paddingHorizontal: 16, paddingBottom: 120 },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardDark: { backgroundColor: "rgba(255,255,255,0.05)", shadowOpacity: 0.3 },
  cardLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  cardRight: { flexDirection: "row", alignItems: "center", gap: 8 },

  cardText: { fontSize: 16, fontWeight: "600", color: "#333" },
  cardTextDark: { color: "#fff" },
  cardValue: { fontSize: 14, color: "#666" },
  cardValueDark: { color: "#ccc" },

  toggle: { width: 40, height: 20, borderRadius: 10, backgroundColor: "#ccc" },
  toggleDark: { backgroundColor: "#555" },
  thumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#fff", alignSelf: "flex-end" },
  thumbDark: { backgroundColor: "#fff" },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF4D4D",
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 24,
  },
  logoutButtonDark: { backgroundColor: "#FF6666" },
  logoutText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  footer: { alignItems: "center", marginBottom: 20 },
  rightsText: { fontSize: 12, color: "#999", marginTop: 2 },
  rightsTexta: { fontSize: 12, color: "#999", marginTop: 2, marginBottom: 70 },
  rightsTextDark: { color: "#aaa" },
});
