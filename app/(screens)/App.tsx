// App.tsx
import { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import DashboardScreen from "./DashboardScreen";
import HangulGridScreen from "./HangulGridScreen"; // ✅ Import
import LessonDetailScreen from "./LessonDetailScreen";
import LessonsScreen from "./LessonsScreen";
import LoginScreen from "./LoginScreen";
import MockExamScreen from "./MockExamScreen";
import ProgressScreen from "./ProgressScreen";
import QuizResultsScreen from "./QuizResultsScreen";
import QuizScreen from "./QuizScreen";
import SettingsScreen from "./SettingsScreen";
import SplashScreen from "./SplashScreen";
import { ThemeProvider, useTheme } from "./ThemeContext";
import TopNavBar from "./TopNavBar";
import VocabularyScreen from "./VocabularyScreen";
import WelcomeScreen from "./WelcomeScreen";
import WordDetailScreen from "./WordDetailScreen";
import WordListScreen from "./WordListScreen";

// ✅ ScreenName type including new screens
export type ScreenName =
  | "splash"
  | "login"
  | "dashboard"
  | "lessons"
  | "lesson-detail"
  | "quiz"
  | "quiz-results"
  | "mock-exam"
  | "vocabulary"
  | "progress"
  | "settings"
  | "word-list"
  | "word-detail" | "hangul-grid" | "welcome"  

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("splash");
  const [currentWordId, setCurrentWordId] = useState<number>(1); // for WordDetailScreen

  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ✅ Type-safe navigate function with optional params
  const navigate = (screen: ScreenName, params?: { id?: number }) => {
    setCurrentScreen(screen);
    if (params?.id) setCurrentWordId(params.id);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#121212" : "#ffffff"}
      />

      {/* TopNavBar */}
      {currentScreen !== "splash" && currentScreen !== "login" && (
        <TopNavBar currentScreen={currentScreen} navigate={navigate} />
      )}

      {/* Screens */}
      {currentScreen === "splash" && <SplashScreen onFinish={() => navigate("welcome")} />}
      {currentScreen === "welcome" && <WelcomeScreen navigate={navigate} />}
      {currentScreen === "login" && <LoginScreen onLogin={() => navigate("dashboard")} navigate={navigate} />}
      {currentScreen === "dashboard" && <DashboardScreen navigate={navigate} />}
      {currentScreen === "lessons" && <LessonsScreen navigate={navigate} />}
      {currentScreen === "lesson-detail" && <LessonDetailScreen navigate={navigate} />}
      {currentScreen === "quiz" && <QuizScreen navigate={navigate} />}
      {currentScreen === "quiz-results" && <QuizResultsScreen navigate={navigate} />}
      {currentScreen === "mock-exam" && <MockExamScreen navigate={navigate} />}
      {currentScreen === "vocabulary" && <VocabularyScreen navigate={navigate} />}
      {currentScreen === "progress" && <ProgressScreen navigate={navigate} />}
      {currentScreen === "settings" && <SettingsScreen navigate={navigate} />}

      {/* New screens */}
      {currentScreen === "word-list" && <WordListScreen navigate={navigate} />}
      {currentScreen === "word-detail" && (
        <WordDetailScreen navigate={navigate} route={{ params: { id: currentWordId } }} />
      )}

       {/* ✅ Hangul Grid Screen */}
       {currentScreen === "hangul-grid" && <HangulGridScreen navigate={navigate} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  containerDark: { backgroundColor: "#121212" },
});
