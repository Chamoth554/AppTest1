// screens/VocabularyScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 375; // base width for scaling (iPhone 8)

function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

const vocabulary = [
  { korean: "안녕하세요", english: "Hello", sinhala: "ආයුබෝවන්" },
  { korean: "감사합니다", english: "Thank you", sinhala: "ස්තූතියි" },
  { korean: "죄송합니다", english: "Sorry", sinhala: "සමාවන්න" },
  { korean: "안녕히 가세요", english: "Goodbye", sinhala: "සුභ සංචාරයක්" },
  { korean: "네", english: "Yes", sinhala: "ඔව්" },
  { korean: "아니요", english: "No", sinhala: "නැහැ" },
  { korean: "사랑해요", english: "I love you", sinhala: "මම ඔබට ආදරෙයි" },
  { korean: "친구", english: "Friend", sinhala: "මිතුරා" },
  { korean: "가족", english: "Family", sinhala: "පවුල" },
  { korean: "학교", english: "School", sinhala: "පාසල" },
  { korean: "집", english: "Home", sinhala: "ගෘහය" },
  { korean: "음식", english: "Food", sinhala: "ආහාරය" },
  { korean: "물", english: "Water", sinhala: "ජලය" },
  { korean: "커피", english: "Coffee", sinhala: "කෝපි" },
  { korean: "차", english: "Tea", sinhala: "තේ" },
  { korean: "책", english: "Book", sinhala: "පොත" },
  { korean: "영화", english: "Movie", sinhala: "චිත්‍රපටිය" },
  { korean: "음악", english: "Music", sinhala: "සංගීතය" },
  { korean: "노래", english: "Song", sinhala: "ගීතය" },
  { korean: "하늘", english: "Sky", sinhala: "අහස" },
  { korean: "바다", english: "Sea", sinhala: "සමুদ্রය" },
  { korean: "산", english: "Mountain", sinhala: "පර්වතය" },
  { korean: "강", english: "River", sinhala: "නදිය" },
  { korean: "길", english: "Road", sinhala: "පාර" },
  { korean: "차량", english: "Car", sinhala: "මෝටර් රථය" },
  { korean: "비행기", english: "Airplane", sinhala: "ගුවන් යානය" },
  { korean: "날씨", english: "Weather", sinhala: "අවධිගත කාලගුණය" },
  { korean: "봄", english: "Spring", sinhala: "වසන්තය" },
  { korean: "여름", english: "Summer", sinhala: "ග्रीෂ්මය" },
  { korean: "가을", english: "Autumn", sinhala: "ශරත්කාලය" },
  { korean: "겨울", english: "Winter", sinhala: "ශීතකාලය" },
  { korean: "시간", english: "Time", sinhala: "කාලය" },
  { korean: "날", english: "Day", sinhala: "දිනය" },
  { korean: "밤", english: "Night", sinhala: "රැයක්" },
  { korean: "월요일", english: "Monday", sinhala: "සඳුදා" },
  { korean: "화요일", english: "Tuesday", sinhala: "අඟහරුවාදා" },
  { korean: "수요일", english: "Wednesday", sinhala: "බදාදා" },
  { korean: "목요일", english: "Thursday", sinhala: "බ්‍රහස්පතින්දා" },
  { korean: "금요일", english: "Friday", sinhala: "සිකුරාදා" },
  { korean: "토요일", english: "Saturday", sinhala: "සෙනසුරාදා" },
  { korean: "일요일", english: "Sunday", sinhala: "ඉරිදා" },
  { korean: "사과", english: "Apple", sinhala: "ඇපල්" },
  { korean: "바나나", english: "Banana", sinhala: "කෙසෙල්" },
  { korean: "오렌지", english: "Orange", sinhala: "කොළඹ" },
  { korean: "채소", english: "Vegetables", sinhala: "එළවළු" },
  { korean: "과일", english: "Fruits", sinhala: "පළතුරු" },
  { korean: "동물", english: "Animal", sinhala: "සත්වය" },
  { korean: "강아지", english: "Dog", sinhala: "බල්ලා" },
  { korean: "고양이", english: "Cat", sinhala: "පූසා" },
  { korean: "새", english: "Bird", sinhala: "කුරුල්ලෝ" },
  { korean: "운동", english: "Exercise", sinhala: "ව්‍යායාම" },
  { korean: "게임", english: "Game", sinhala: "ක්‍රීඩාව" },
  { korean: "여행", english: "Travel", sinhala: "ගමන" },
];


interface Props { navigate: (s: ScreenName) => void; }

export default function VocabularyScreen({ navigate }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cardWidth = SCREEN_WIDTH - normalize(32);
  const cardHeight = cardWidth * 0.65;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigate("dashboard")}>
          <Ionicons name="chevron-back" size={normalize(22)} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.title, isDark && styles.titleDark]}>Vocabulary</Text>
        <TouchableOpacity>
          <Ionicons name="star-outline" size={normalize(22)} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.card, { width: cardWidth, height: cardHeight }]}
        onPress={() => setFlipped((f) => !f)}
      >
        {!flipped ? (
          <View style={styles.cardFront}>
            <Text style={[styles.korean, { fontSize: normalize(36) }]}>{vocabulary[index].korean}</Text>
            <Text style={[styles.hint, { fontSize: normalize(14) }]}>Tap to see meaning</Text>
          </View>
        ) : (
          <View style={[styles.cardBack, isDark && styles.cardBackDark]}>
            <Text style={[styles.english, isDark && styles.englishDark, { fontSize: normalize(22) }]}>{vocabulary[index].english}</Text>
            <Text style={[styles.sinhala, isDark && styles.sinhalaDark, { fontSize: normalize(18) }]}>{vocabulary[index].sinhala}</Text>
            <TouchableOpacity style={styles.audio}>
              <Ionicons name="volume-high" size={normalize(20)} color="#667eea" />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.navRow}>
        <TouchableOpacity
          onPress={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          style={[styles.navBtn, index === 0 && { opacity: 0.5 }, isDark && styles.navBtnDark]}
        >
          <Ionicons name="chevron-back" size={normalize(22)} color="#667eea" />
        </TouchableOpacity>

        <Text style={[styles.counter, isDark && styles.counterDark, { fontSize: normalize(16) }]}>{index + 1} / {vocabulary.length}</Text>

        <TouchableOpacity
          onPress={() => setIndex((i) => Math.min(vocabulary.length - 1, i + 1))}
          disabled={index === vocabulary.length - 1}
          style={[styles.navBtn, index === vocabulary.length - 1 && { opacity: 0.5 }, isDark && styles.navBtnDark]}
        >
          <Ionicons name="chevron-forward" size={normalize(22)} color="#667eea" />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action}>
          <Ionicons name="checkmark" size={normalize(18)} color="#4CAF50" />
          <Text style={[styles.actionText, isDark && styles.actionTextDark, { fontSize: normalize(12) }]}>Learned</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <Ionicons name="star" size={normalize(18)} color="#FFD700" />
          <Text style={[styles.actionText, isDark && styles.actionTextDark, { fontSize: normalize(12) }]}>Favorite</Text>
        </TouchableOpacity>
      </View>
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

  card: { borderRadius: 20, margin: 16, elevation: 8, overflow: "hidden" },
  cardFront: { flex: 1, backgroundColor: "#667eea", justifyContent: "center", alignItems: "center", padding: 24 },
  cardBack: { flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center", padding: 24, borderWidth: 2, borderColor: "#667eea" },
  cardBackDark: { backgroundColor: "#1E1E1E", borderColor: "#667eea" },

  korean: { fontWeight: "700", color: "white", marginBottom: 12 },
  hint: { color: "rgba(255,255,255,0.85)" },

  english: { fontWeight: "700", color: "#333", marginBottom: 8 },
  englishDark: { color: "#fff" },
  sinhala: { color: "#666", marginBottom: 12 },
  sinhalaDark: { color: "#ccc" },

  audio: { marginTop: 8, backgroundColor: "white", borderRadius: 20, padding: 8 },

  navRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 28, marginTop: 8 },
  navBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: "white", justifyContent: "center", alignItems: "center", elevation: 2 },
  navBtnDark: { backgroundColor: "#1E1E1E" },
  counter: { color: "#666", fontWeight: "600" },
  counterDark: { color: "#ccc" },

  actions: { flexDirection: "row", justifyContent: "space-around", marginTop: 18 },
  action: { alignItems: "center" },
  actionText: { color: "#666", marginTop: 6 },
  actionTextDark: { color: "#ccc" },
});
