import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

declare global {
  var __lastQuizScore: number | undefined;
  var __lastQuizTotal: number | undefined;
}

interface Quiz {
  questionEn: string;
  questionSi: string;
  options: string[];
  correctAnswer: number;
}

// 15 sample questions
const quizData: Quiz[] = [
  {
    questionEn: 'How do you say "Hello" in Korean?',
    questionSi: 'කොරියානු භාෂාවෙන් "Hello" කියන්නේ කොහොමද?',
    options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'],
    correctAnswer: 0,
  },
  {
    questionEn: 'What does "감사합니다" mean?',
    questionSi: '"감사합니다" කියන්නේ කුමක්ද?',
    options: ['Goodbye', 'Thank you', 'Sorry', 'Hello'],
    correctAnswer: 1,
  },
  {
    questionEn: 'How do you say "1" in Korean?',
    questionSi: '"1" කොරියානු භාෂාවෙන් කොහොම කියනවද?',
    options: ['둘', '하나', '셋', '넷'],
    correctAnswer: 1,
  },
  {
    questionEn: 'How do you say "Thank you" in Korean?',
    questionSi: 'කොරියානු භාෂාවෙන් "Thank you" කියන්නේ කොහොමද?',
    options: ['감사합니다', '죄송합니다', '안녕하세요', '안녕히 가세요'],
    correctAnswer: 0,
  },
  {
    questionEn: 'What does "죄송합니다" mean?',
    questionSi: '"죄송합니다" කියන්නේ කුමක්ද?',
    options: ['Hello', 'Sorry', 'Goodbye', 'Thank you'],
    correctAnswer: 1,
  },
  {
    questionEn: 'How do you say "Goodbye" in Korean?',
    questionSi: 'කොරියානු භාෂාවෙන් "Goodbye" කියන්නේ කොහොමද?',
    options: ['안녕하세요', '안녕히 가세요', '감사합니다', '죄송합니다'],
    correctAnswer: 1,
  },
  {
    questionEn: 'How do you say "2" in Korean?',
    questionSi: '"2" කොරියානු භාෂාවෙන් කොහොම කියනවද?',
    options: ['하나', '둘', '셋', '넷'],
    correctAnswer: 1,
  },
  {
    questionEn: 'How do you say "3" in Korean?',
    questionSi: '"3" කොරියානු භාෂාවෙන් කොහොම කියනවද?',
    options: ['셋', '하나', '둘', '넷'],
    correctAnswer: 0,
  },
  {
    questionEn: 'How do you say "4" in Korean?',
    questionSi: '"4" කොරියානු භාෂාවෙන් කොහොම කියනවද?',
    options: ['넷', '셋', '둘', '하나'],
    correctAnswer: 0,
  },
  {
    questionEn: 'How do you say "Sorry" in Korean?',
    questionSi: 'කොරියානු භාෂාවෙන් "Sorry" කියන්නේ කොහොමද?',
    options: ['죄송합니다', '감사합니다', '안녕하세요', '안녕히 가세요'],
    correctAnswer: 0,
  },
  {
    questionEn: 'What does "안녕하세요" mean?',
    questionSi: '"안녕하세요" කියන්නේ කුමක්ද?',
    options: ['Hello', 'Thank you', 'Goodbye', 'Sorry'],
    correctAnswer: 0,
  },
  {
    questionEn: 'What does "안녕히 가세요" mean?',
    questionSi: '"안녕히 가세요" කියන්නේ කුමක්ද?',
    options: ['Goodbye', 'Hello', 'Sorry', 'Thank you'],
    correctAnswer: 0,
  },
  {
    questionEn: 'How do you say "5" in Korean?',
    questionSi: '"5" කොරියානු භාෂාවෙන් කොහොම කියනවද?',
    options: ['넷', '다섯', '셋', '둘'],
    correctAnswer: 1,
  },
  {
    questionEn: 'How do you say "6" in Korean?',
    questionSi: '"6" කොරියානු භාෂාවෙන් කොහොම කියනවද?',
    options: ['여섯', '다섯', '넷', '셋'],
    correctAnswer: 0,
  },
  {
    questionEn: 'What does "하나" mean?',
    questionSi: '"하나" කියන්නේ කුමක්ද?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 0,
  },
];

// Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

interface Props { navigate: (s: ScreenName) => void; }

export default function QuizScreen({ navigate }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // shuffle questions on mount
  const [shuffledQuiz, setShuffledQuiz] = useState<Quiz[]>([]);
  useEffect(() => {
    setShuffledQuiz(shuffleArray(quizData));
  }, []);

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === shuffledQuiz[currentQuiz].correctAnswer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQuiz < shuffledQuiz.length - 1) {
      setCurrentQuiz((q) => q + 1);
      setSelected(null);
    } else {
      globalThis.__lastQuizScore = score;
      globalThis.__lastQuizTotal = shuffledQuiz.length;
      navigate("quiz-results");
    }
  };

  const getOptionStyle = (i: number) => {
    if (selected === null) return [styles.optionCard, isDark && styles.optionCardDark];
    if (i === shuffledQuiz[currentQuiz].correctAnswer)
      return [styles.optionCard, styles.correctOption, isDark && styles.correctOptionDark];
    if (i === selected) return [styles.optionCard, styles.wrongOption, isDark && styles.wrongOptionDark];
    return [styles.optionCard, isDark && styles.optionCardDark];
  };

  const getOptionTextStyle = (i: number) => {
    if (selected === null) return [styles.optionText, isDark && styles.optionTextDark];
    if (i === shuffledQuiz[currentQuiz].correctAnswer)
      return [styles.optionText, styles.correctOptionText, isDark && styles.correctOptionTextDark];
    if (i === selected) return [styles.optionText, styles.wrongOptionText, isDark && styles.wrongOptionTextDark];
    return [styles.optionText, isDark && styles.optionTextDark];
  };

  if (shuffledQuiz.length === 0) return null; // prevent render before shuffle

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigate("dashboard")}>
          <Ionicons name="chevron-back" size={24} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.title, isDark && styles.titleDark]}>Quiz</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressRow}>
        <View style={[styles.progressBar, isDark && styles.progressBarDark]}>
          <View style={[styles.progressFill, { width: `${((currentQuiz + 1) / shuffledQuiz.length) * 100}%` }]} />
        </View>
        <Text style={[styles.progressText, isDark && styles.progressTextDark]}>
          {currentQuiz + 1} / {shuffledQuiz.length} | Score: {score}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Question */}
        <Text style={[styles.question, isDark && styles.questionDark]}>
          Q{currentQuiz + 1}: {shuffledQuiz[currentQuiz].questionEn}
        </Text>
        <Text style={[styles.questionSi, isDark && styles.questionDark]}>
          {shuffledQuiz[currentQuiz].questionSi}
        </Text>

        {/* Options */}
        <View style={styles.options}>
          {shuffledQuiz[currentQuiz].options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={getOptionStyle(i)}
              onPress={() => handleAnswer(i)}
              disabled={selected !== null}
            >
              <Text style={getOptionTextStyle(i)}>
                {i + 1}. {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        {selected !== null && (
          <TouchableOpacity style={[styles.nextButton, isDark && styles.nextButtonDark]} onPress={handleNext}>
            <Text style={[styles.nextButtonText, isDark && styles.nextButtonTextDark]}>
              {currentQuiz < shuffledQuiz.length - 1 ? "Next Question" : "Finish Quiz"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

// styles remain the same


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#121212" },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 14, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  headerDark: { borderBottomColor: "#333" },

  title: { fontSize: 18, fontWeight: "700", color: "#333" },
  titleDark: { color: "#fff" },

  progressRow: { paddingHorizontal: 16, paddingVertical: 12 },
  progressBar: { height: 6, backgroundColor: "#f0f0f0", borderRadius: 3 },
  progressBarDark: { backgroundColor: "#333" },
  progressFill: { height: "100%", backgroundColor: "#667eea", borderRadius: 3 },
  progressText: { marginTop: 8, color: "#666", fontSize: 13 },
  progressTextDark: { color: "#ccc" },

  content: { padding: 16, flex: 1 },
  question: { fontSize: 18, fontWeight: "700", marginBottom: 6, color: "#333" },
  questionSi: { fontSize: 16, marginBottom: 16, color: "#555" },
  questionDark: { color: "#fff" },

  options: { gap: 12 },
  optionCard: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: "#e8e8e8", backgroundColor: "#fff", marginBottom: 10 },
  optionCardDark: { backgroundColor: "#1E1E1E", borderColor: "#333" },
  optionText: { fontSize: 16, textAlign: "center", color: "#333" },
  optionTextDark: { color: "#fff" },

  correctOption: { borderColor: "#28a745", backgroundColor: "#d4edda" },
  correctOptionDark: { backgroundColor: "#22543d" },
  correctOptionText: { color: "#28a745", fontWeight: "700" },
  correctOptionTextDark: { color: "#9ae6b4" },

  wrongOption: { borderColor: "#dc3545", backgroundColor: "#f8d7da" },
  wrongOptionDark: { backgroundColor: "#742a2a" },
  wrongOptionText: { color: "#dc3545", fontWeight: "700" },
  wrongOptionTextDark: { color: "#fca5a5" },

  nextButton: { marginTop: 20, backgroundColor: "#667eea", padding: 14, borderRadius: 12 },
  nextButtonDark: { backgroundColor: "#8ab4f8" },
  nextButtonText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 16 },
  nextButtonTextDark: { color: "#121212" },
});
