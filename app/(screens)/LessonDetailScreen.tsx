import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import vocabulary from "./data/vocabulary";
import { useTheme } from "./ThemeContext";

interface Props { navigate: (s: ScreenName, params?: any) => void; }

export default function LessonDetailScreen({ navigate }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [currentIndex, setCurrentIndex] = useState(0);
  const word = vocabulary[currentIndex];

  const goPrev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const goNext = () => currentIndex < vocabulary.length - 1 && setCurrentIndex(currentIndex + 1);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigate("lessons")}>
          <Ionicons name="chevron-back" size={22} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.title, isDark && styles.titleDark]}>Vocabulary Detail</Text>
        <TouchableOpacity>
          <Ionicons name="volume-high" size={22} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Top Bar: View All */}
        <View style={styles.topBar}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>Vocabulary</Text>
          <TouchableOpacity onPress={() => navigate("word-list")}>
            <Text style={[styles.viewAll, isDark && styles.viewAllDark]}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Vocabulary Card */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.wordContainer}>
            <Text style={[styles.korean, isDark && styles.koreanDark]}>{word.kor}</Text>
            <Text style={[styles.english, isDark && styles.englishDark]}>{word.eng}</Text>
            <Text style={[styles.sinhala, isDark && styles.sinhalaDark]}>{word.sinhala}</Text>
          </View>
          <TouchableOpacity style={[styles.audioBtn, isDark && styles.audioBtnDark]}>
            <Ionicons name="play" size={20} color="#667eea" />
          </TouchableOpacity>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navContainer}>
          <TouchableOpacity style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]} onPress={goPrev} disabled={currentIndex === 0}>
            <Ionicons name="chevron-back" size={18} color="white" />
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navBtn, currentIndex === vocabulary.length - 1 && styles.navBtnDisabled]} onPress={goNext} disabled={currentIndex === vocabulary.length - 1}>
            <Text style={styles.navText}>Next</Text>
            <Ionicons name="chevron-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>

    {/* Grammar Notes */}
{word.grammar && (
  <View style={[styles.card, isDark && styles.cardDark]}>
    <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Grammar Notes</Text>
    <Text style={[styles.cardText, isDark && styles.cardTextDark]}>
       {word.grammar}{"\n"}
        <Text style={{ fontWeight: "700" }}>{word.grammarSinhala}</Text>
    </Text>
  </View>
)}

{/* Cultural Tips */}
{word.tips && (
  <View style={[styles.card, isDark && styles.cardDark]}>
    <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Cultural Tips</Text>
    <Text style={[styles.cardText, isDark && styles.cardTextDark]}>
      {word.tips}{"\n"}
      <Text style={{ fontWeight: "700" }}>{word.tipsSinhala}</Text>
    </Text>
  </View>
)}


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#121212" },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  headerDark: { borderBottomColor: "#333" },

  title: { fontSize: 18, fontWeight: "700", color: "#333" },
  titleDark: { color: "#fff" },

  content: { flex: 1, padding: 16 },

  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#333" },
  sectionTitleDark: { color: "#fff" },
  viewAll: { color: "#667eea", fontWeight: "600" },
  viewAllDark: { color: "#aab4ff" },

  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  cardDark: {
    backgroundColor: "#1e1e1e",
    shadowColor: "#000",
    shadowOpacity: 0.3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  cardTitleDark: {
    color: "#fff",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    textAlign: "left", // ensures left-aligned bullets
  },
  cardTextDark: {
    color: "#ccc",
  },
  

  wordContainer: { marginBottom: 10 },
  korean: { fontSize: 28, fontWeight: "700", marginBottom: 6, color: "#333" },
  koreanDark: { color: "#fff" },
  english: { fontSize: 18, color: "#666", marginBottom: 4 },
  englishDark: { color: "#ccc" },
  sinhala: { fontSize: 16, color: "#999" },
  sinhalaDark: { color: "#aaa" },

  audioBtn: { position: "absolute", right: 16, top: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: "white", justifyContent: "center", alignItems: "center", elevation: 2 },
  audioBtnDark: { backgroundColor: "#333" },

  navContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  navBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#667eea", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 22 },
  navBtnDisabled: { backgroundColor: "#999" },
  navText: { color: "white", marginHorizontal: 6, fontWeight: "600" },

  section: { marginBottom: 18 },
  text: { color: "#666", lineHeight: 20 },
  textDark: { color: "#ccc" },
});
