// screens/HangulGridScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  FlatList,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 375;

function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
}

interface Hangul {
  hangul: string;
  roman: string;
  sinhala: string;
}

interface HangulSection {
  title: string;
  data: Hangul[];
}

// Consonants
const consonants: Hangul[] = [
  { hangul: "ㄱ", roman: "g/k", sinhala: "ග / ක" },
  { hangul: "ㄴ", roman: "n", sinhala: "න" },
  { hangul: "ㄷ", roman: "d/t", sinhala: "ඩ / ට" },
  { hangul: "ㄹ", roman: "r/l", sinhala: "ර / ල" },
  { hangul: "ㅁ", roman: "m", sinhala: "ම" },
  { hangul: "ㅂ", roman: "b/p", sinhala: "බ / ප" },
  { hangul: "ㅅ", roman: "s", sinhala: "ස" },
  { hangul: "ㅇ", roman: "silent/ng", sinhala: "නීර්ව / ඩිග්" },
  { hangul: "ㅈ", roman: "j", sinhala: "ජ" },
  { hangul: "ㅊ", roman: "ch", sinhala: "ච" },
  { hangul: "ㅋ", roman: "k", sinhala: "ක" },
  { hangul: "ㅌ", roman: "t", sinhala: "ට" },
  { hangul: "ㅍ", roman: "p", sinhala: "ප" },
  { hangul: "ㅎ", roman: "h", sinhala: "හ" },
];

// Vowels
const vowels: Hangul[] = [
  { hangul: "ㅏ", roman: "a", sinhala: "අ" },
  { hangul: "ㅑ", roman: "ya", sinhala: "යා" },
  { hangul: "ㅓ", roman: "eo", sinhala: "එ" },
  { hangul: "ㅕ", roman: "yeo", sinhala: "යේ" },
  { hangul: "ㅗ", roman: "o", sinhala: "ඔ" },
  { hangul: "ㅛ", roman: "yo", sinhala: "යො" },
  { hangul: "ㅜ", roman: "u", sinhala: "උ" },
  { hangul: "ㅠ", roman: "yu", sinhala: "යු" },
  { hangul: "ㅡ", roman: "eu", sinhala: "ඇ" },
  { hangul: "ㅣ", roman: "i", sinhala: "ඉ" },
  // Combined vowels
  { hangul: "ㅐ", roman: "ae", sinhala: "ඇ" },
  { hangul: "ㅒ", roman: "yae", sinhala: "යැ" },
  { hangul: "ㅔ", roman: "e", sinhala: "ෙ" },
  { hangul: "ㅖ", roman: "ye", sinhala: "යේ" },
  { hangul: "ㅘ", roman: "wa", sinhala: "වා" },
  { hangul: "ㅙ", roman: "wae", sinhala: "වේ" },
  { hangul: "ㅚ", roman: "oe", sinhala: "වෙ" },
  { hangul: "ㅝ", roman: "wo", sinhala: "වො" },
  { hangul: "ㅞ", roman: "we", sinhala: "වේ" },
  { hangul: "ㅟ", roman: "wi", sinhala: "වී" },
  { hangul: "ㅢ", roman: "ui", sinhala: "ඌ" },
];

// Double consonants
const doubleConsonants: Hangul[] = [
  { hangul: "ㄲ", roman: "kk", sinhala: "ක්ක්" },
  { hangul: "ㄸ", roman: "tt", sinhala: "ට්ට්" },
  { hangul: "ㅃ", roman: "pp", sinhala: "ප්ප්" },
  { hangul: "ㅆ", roman: "ss", sinhala: "ස්ස්" },
  { hangul: "ㅉ", roman: "jj", sinhala: "ජ්ජ්" },
];

const hangulSections: HangulSection[] = [
  { title: "ස්වර නොවන අක්ෂර / 자음 (Consonants) ", data: consonants },
  { title: "Vowels (ස්වර / 모음)", data: vowels },
  { title: "Double Consonants (දෙගුණිත ව්‍යංජන / 겹받침)", data: doubleConsonants },
];


interface Props {
  navigate: (s: ScreenName) => void;
}

export default function HangulGridScreen({ navigate }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const CARD_MARGIN = 6;
  const CARD_WIDTH = (SCREEN_WIDTH - 24 - CARD_MARGIN * 2 * 3) / 3;

  const renderItem = ({ item }: { item: Hangul }) => (
    <Pressable
      style={[
        styles.card,
        { width: CARD_WIDTH },
        isDark && styles.cardDark,
      ]}
    >
      <Text style={[styles.hangul, isDark && styles.hangulDark]}>
        {item.hangul}
      </Text>
      <Text style={[styles.roman, isDark && styles.romanDark]}>
        {item.roman}
      </Text>
      <Text style={[styles.sinhala, isDark && styles.sinhalaDark]}>
        {item.sinhala}
      </Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Pressable onPress={() => navigate("dashboard")}>
          <Ionicons
            name="chevron-back"
            size={normalize(22)}
            color={isDark ? "#fff" : "#333"}
          />
        </Pressable>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          Hangul Chart
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Sections with FlatList per section */}
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {hangulSections.map((section) => (
          <View key={section.title} style={{ marginBottom: 20 }}>
            <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
              {section.title}
            </Text>
            <FlatList
              data={section.data}
              renderItem={renderItem}
              keyExtractor={(item) => item.hangul}
              numColumns={3}
              scrollEnabled={false} // let ScrollView handle scrolling
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",marginBottom:45 },
  containerDark: { backgroundColor: "#121212" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerDark: { borderBottomColor: "#333" },

  title: { fontSize: 20, fontWeight: "700", color: "#333" },
  titleDark: { color: "#fff" },

  sectionTitle: {
    fontSize: normalize(18),
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 6,
    color: "#333",
  },
  sectionTitleDark: { color: "#FFD700" },

  card: {
    margin: 6,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    
  },
  cardDark: { backgroundColor: "#1E1E1E" },

  hangul: {
    fontSize: normalize(32),
    fontWeight: "700",
    color: "#667eea",
    marginBottom: 8,
  },
  hangulDark: { color: "#FFD700" },

  roman: { fontSize: normalize(14), fontWeight: "600", color: "#333", marginBottom: 4 },
  romanDark: { color: "#ccc" },

  sinhala: { fontSize: normalize(12), color: "#666" },
  sinhalaDark: { color: "#aaa" },
});
