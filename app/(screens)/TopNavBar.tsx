// TopNavBar.tsx
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

interface TopNavBarProps {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName) => void;
}

const navItems: { id: ScreenName; name: string; title: string }[] = [
  { id: "dashboard", name: "🏠", title: "Home" },
  { id: "hangul-grid", name: "🈷️", title: "Hangul Chart" }, // ✅ Changed icon
  { id: "lessons", name: "📚", title: "Lessons" },
 
  { id: "lesson-detail", name: "📖", title: "Detail" },
  { id: "quiz", name: "❓", title: "Quiz" },
  { id: "mock-exam", name: "📝", title: "Exam" },
  { id: "vocabulary", name: "💭", title: "Cards" },
  { id: "progress", name: "📊", title: "Progress" },
  { id: "settings", name: "⚙️", title: "Settings" },
];

export default function TopNavBar({ currentScreen, navigate }: TopNavBarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.button,
              isDark && styles.buttonDark,
              currentScreen === item.id && (isDark ? styles.activeButtonDark : styles.activeButton)
            ]}
            onPress={() => navigate(item.id)}
          >
            <Text
              style={[
                styles.text,
                isDark && styles.textDark,
                currentScreen === item.id && styles.activeText
              ]}
            >
              {item.name} {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    paddingVertical: 0,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  containerDark: {
    backgroundColor: "#1E1E1E",
    borderBottomColor: "#333",
  },
  button: {
    marginHorizontal: 3,
    marginVertical:6,
    marginTop:40,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  buttonDark: {
    backgroundColor: "#333",
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  activeButtonDark: {
    backgroundColor: "#3399FF",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  textDark: {
    color: "#fff",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
