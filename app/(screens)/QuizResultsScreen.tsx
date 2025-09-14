// screens/QuizResultsScreen.tsx
// (content omitted for brevity, already provided above)
// screens/QuizResultsScreen.tsx
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";

interface Props { navigate: (s: ScreenName) => void; }

export default function QuizResultsScreen({ navigate }: Props) {
  // read global values set by QuizScreen
  const score = (globalThis as any).__lastQuizScore ?? 0;
  const total = (globalThis as any).__lastQuizTotal ?? 0;
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.gradient}>
        <Text style={styles.title}>Quiz Complete!</Text>

        <View style={styles.scoreRow}>
          <Text style={styles.score}>{score}</Text>
          <Text style={styles.div}>/</Text>
          <Text style={styles.total}>{total}</Text>
        </View>

        <Text style={styles.percent}>{percent}%</Text>

        <TouchableOpacity style={styles.retry} onPress={() => navigate("quiz")}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.back} onPress={() => navigate("dashboard")}>
          <Text style={styles.backText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 36 },
  title: { color: "white", fontSize: 28, fontWeight: "700", marginBottom: 18 },
  scoreRow: { flexDirection: "row", alignItems: "baseline", marginBottom: 12 },
  score: { fontSize: 64, fontWeight: "700", color: "white" },
  div: { fontSize: 44, color: "rgba(255,255,255,0.8)", marginHorizontal: 10 },
  total: { fontSize: 42, color: "rgba(255,255,255,0.8)" },
  percent: { color: "white", fontSize: 18, marginBottom: 26 },
  retry: { backgroundColor: "white", paddingVertical: 12, paddingHorizontal: 28, borderRadius: 24, marginBottom: 12 },
  retryText: { color: "#667eea", fontWeight: "700" },
  back: { paddingVertical: 10 },
  backText: { color: "white" },
});
