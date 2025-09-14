import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Dimensions, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext"; // <- import theme context

const { width } = Dimensions.get("window");

interface Props { navigate: (s: ScreenName) => void; }

export default function DashboardScreen({ navigate }: Props) {
  const { theme } = useTheme(); // <- get current theme
  const isDark = theme === "dark"; // check if dark mode

  const [user, setUser] = useState({ name: "", progress: 65, completedLessons: 12, streak: 7 });

  useEffect(() => {
    const loadUser = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) {
        setUser(prev => ({ ...prev, name: storedName }));
      }
    };
    loadUser();
  }, []);
  

  const cards = [
    { title: "Lessons", subtitle: `${user.completedLessons} completed`, icon: "book-outline", colors: ["#FF3B6B", "#FF7E72"] as const, screen: "lessons" },
    { title: "Vocabulary", subtitle: "Practice words", icon: "library-outline", colors: ["#1EBDC3", "#65AACA"] as const, screen: "vocabulary" },
    { title: "Quizzes", subtitle: "Test yourself", icon: "help-circle-outline", colors: ["#45B7D1", "#1E90FF"] as const, screen: "quiz" },
    { title: "Mock Exams", subtitle: "Full practice", icon: "document-text-outline", colors: ["#F7BC6D", "#F5B79F"] as const, screen: "mock-exam" },
  ];

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.greeting, isDark && styles.greetingDark]}>Hello, {user.name || "Student"}! 👋</Text>
        <Text style={[styles.readyText, isDark && styles.readyTextDark]}>Ready to study?</Text>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, isDark && styles.progressTextDark]}>Progress: {user.progress}%</Text>
          <View style={[styles.progressBar, isDark && styles.progressBarDark]}>
            <View style={[styles.progressFill,isDark && styles.progressFillDark, { width: `${user.progress}%` }]} />
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardGrid}>
          {cards.map((card) => (
            <Pressable
              key={card.title}
              style={({ pressed }) => [
                styles.card,
                { transform: [{ scale: pressed ? 0.97 : 1 }] },
                Platform.OS === "ios" && { shadowOpacity: pressed ? 0.25 : 0.15 },
              ]}
              onPress={() => navigate(card.screen as ScreenName)}
            >
              <LinearGradient
                colors={card.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientCard}
              >
                <Ionicons name={card.icon as any} size={30} color="white" />
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        {/* Streak */}
        <View style={[styles.streak, isDark && styles.streakDark]}>
          <Ionicons name="flame" size={24} color="#FF6B6B" />
          <Text style={[styles.streakText, isDark && styles.streakTextDark]}>Study streak: {user.streak} days</Text>
        </View>

        {/* Footer Buttons */}
        <View style={[styles.footerButtons]}>
          <Pressable style={({ pressed }) => [styles.smallBtn, pressed && { opacity: 0.7 }, isDark && styles.smallBtnDark]} onPress={() => navigate("progress")}>
            <Ionicons name="stats-chart" size={20} color="#667eea" />
            <Text style={styles.smallBtnText}>Progress</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.smallBtn, pressed && { opacity: 0.7 }, isDark && styles.smallBtnDark]} onPress={() => navigate("settings")}>
            <Ionicons name="settings" size={20} color="#667eea" />
            <Text style={styles.smallBtnText}>Settings</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  containerDark: { backgroundColor: "#121212" },

  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    backgroundColor: "#667eea",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerDark: { backgroundColor: "#1E1E1E" },

  greeting: { color: "white", fontSize: 24, fontWeight: "700" },
  greetingDark: { color: "#fff" },

  readyText: { color: "rgba(255,255,255,0.9)", marginTop: 4, fontSize: 16 },
  readyTextDark: { color: "rgba(255,255,255,0.85)" },

  progressContainer: { marginTop: 16 },
  progressText: { color: "white", fontSize: 14, marginBottom: 6 },
  progressTextDark: { color: "#fff" },

  progressBar: { height: 8, backgroundColor: "rgba(255,255,255,0.25)", borderRadius: 4 },
  progressBarDark: { backgroundColor: "rgba(255,255,255,0.15)" },

  content: { flex: 1, paddingHorizontal: 18, paddingTop: 15 },
  cardGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 15 },
  card: { width: (width - 54) / 2, aspectRatio: 1, borderRadius: 20, marginBottom: 18, overflow: "hidden" },
  gradientCard: { flex: 1, justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 16 },
  cardTitle: { color: "white", fontSize: 18, fontWeight: "700", marginTop: 12 },
  cardSubtitle: { color: "rgba(255,255,255,0.9)", fontSize: 12, marginTop: 4 },

  progressFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 4,
  },
  progressFillDark: {
    backgroundColor: "#667eea", // or any color you prefer for dark theme
  },
  
  streak: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  
  streakDark: { backgroundColor: "#1E1E1E" },
  streakText: { marginLeft: 12, color: "#333", fontSize: 15, fontWeight: "600" },
  streakTextDark: { color: "#fff" },

  footerButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
  smallBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    backgroundColor: "white",
    borderRadius: 16,
    width: "48%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  smallBtnDark: { backgroundColor: "#1E1E1E" },
  smallBtnText: { marginLeft: 8, color: "#667eea", fontWeight: "600" },
});
