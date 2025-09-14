// screens/ProgressScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

interface Props { navigate: (s: ScreenName) => void; }

export default function ProgressScreen({ navigate }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [user, setUser] = useState({ name: "", email:  "Level Up! 레벨 업! 🚀", completedLessons: 12, streak: 7 });
 
  useEffect(() => {
    const loadUser = async () => {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) {
        setUser(prev => ({ ...prev, name: storedName }));
      }
    };
    loadUser();
  }, []);
  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigate("dashboard")}>
          <Ionicons name="chevron-back" size={22} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.title, isDark && styles.titleDark]}>Profile & Progress</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={[styles.profile, isDark && styles.profileDark]}>
        <View style={styles.avatar}><Text style={styles.avatarText}>🇰🇷</Text></View>
        <Text style={[styles.name, isDark && styles.nameDark]}>{user.name}</Text>
        <Text style={[styles.email, isDark && styles.emailDark]}>{user.email}</Text>
      </View>

      <View style={styles.stats}>
        {[
          { value: user.completedLessons, label: "Lessons Completed" },
          { value: user.streak, label: "Day Streak" },
          { value: "85%", label: "Quiz Average" },
          { value: 3, label: "Mock Exams" },
        ].map((s, i) => (
          <View key={i} style={[styles.statCard, isDark && styles.statCardDark]}>
            <Text style={[styles.statNum, isDark && styles.statNumDark]}>{s.value}</Text>
            <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>{s.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartSection}>
        <Text style={[styles.chartTitle, isDark && styles.chartTitleDark]}>Weekly Progress</Text>
        <View style={[styles.chart, isDark && styles.chartDark]}>
          {[40, 60, 80, 45, 90, 75, 65].map((h, i) => (
            <View key={i} style={styles.chartBar}>
              <View style={[styles.fill, { height: `${h}%` }]} />
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.upgrade}>
        <Ionicons name="star" size={18} color="#FFD700" />
        <Text style={styles.upgradeText}>Upgrade to Premium</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#121212" },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  headerDark: { borderBottomColor: "#333" },
  title: { fontSize: 18, fontWeight: "700", color: "#333" },
  titleDark: { color: "#fff" },

  profile: { alignItems: "center", paddingVertical: 12, backgroundColor: "#f8f9fa", marginBottom: 10 },
  profileDark: { backgroundColor: "#1E1E1E" },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#667eea", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText: { color: "white", fontSize: 32, fontWeight: "700" },
  name: { fontSize: 22, fontWeight: "700", color: "#333" },
  nameDark: { color: "#fff" },
  email: { color: "#666", marginTop: 6 },
  emailDark: { color: "#ccc" },

  stats: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 14, gap: 12 },
  statCard: { width: "48%", backgroundColor: "white", borderRadius: 12, padding: 16, alignItems: "center", elevation: 2, marginBottom: 12 },
  statCardDark: { backgroundColor: "#1E1E1E" },
  statNum: { fontSize: 24, fontWeight: "700", color: "#667eea" },
  statNumDark: { color: "#667eea" },
  statLabel: { fontSize: 12, color: "#666", marginTop: 6, textAlign: "center" },
  statLabelDark: { color: "#ccc" },

  chartSection: { paddingHorizontal: 14, marginTop: 12 },
  chartTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#333" },
  chartTitleDark: { color: "#fff" },
  chart: { flexDirection: "row", alignItems: "flex-end", height: 120, backgroundColor: "white", borderRadius: 12, padding: 12, gap: 8 },
  chartDark: { backgroundColor: "#1E1E1E" },
  chartBar: { flex: 1, justifyContent: "flex-end" },
  fill: { backgroundColor: "#667eea", borderRadius: 4, minHeight: 4 },

  upgrade: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#FFD700", margin: 14, padding: 14, borderRadius: 12 ,marginBottom:20},
  upgradeText: { marginLeft: 8, fontWeight: "700" },
});
