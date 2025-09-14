// app/screens/MockExamScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

interface Props {
  navigate: (s: ScreenName) => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  audioUrl?: any; // require('../../assets/listening/aud/q1.mp3')
  image?: any; // require('../../assets/listening/img/q1.png')
}

export default function MockExamScreen({ navigate }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<"listening" | "reading">("listening");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  // Listening questions
  const listeningQuestions: Question[] = [
    {
      id: 1,
      text: "남자가 무엇을 하고 있습니까?",
      options: ["공부하고 있습니다.", "운동하고 있습니다.", "요리하고 있습니다.", "운전하고 있습니다."],
      correctIndex: 1,
      audioUrl: require('../../assets/listning/aud/q1.mp3'),
      image: require('../../assets/listning/img/q1.png'),
    },
    {
      id: 2,
      text: "여자가 어디에 가려고 합니까?",
      options: ["은행", "병원", "시장", "학교"],
      correctIndex: 2,
      audioUrl: require('../../assets/listning/aud/q2.mp3'),
      image: require('../../assets/listning/img/q2.jpg'),
    },
    {
      id: 3,
      text: "오늘 날씨는 어떻습니까?",
      options: ["춥습니다.", "더웁니다.", "좋습니다.", "비가 옵니다."],
      correctIndex: 2,
      audioUrl: require('../../assets/listning/aud/q3.mp3'),
      image: require('../../assets/listning/img/q3.png'),
    },
    {
      id: 4,
      text: "남자는 무엇을 사고 싶어합니까?",
      options: ["신발", "가방", "모자", "옷"],
      correctIndex: 1,
      audioUrl: require('../../assets/listning/aud/q4.mp3'),
      image: require('../../assets/listning/img/q4.png'),
    },
    {
      id: 5,
      text: "대화를 듣고 맞는 것을 고르십시오.",
      options: [
        "여자 두 명이 커피를 마십니다.",
        "남자는 불고기를 먹고 싶어합니다.",
        "두 사람은 점심을 먹고 있습니다.",
        "두 사람은 내일 약속이 있습니다."
      ],
      correctIndex: 0,
      audioUrl: require('../../assets/listning/aud/q5.mp3'),
      image: require('../../assets/listning/img/q5.png'),
    }
  ];

 // Reading questions in Korean
const readingQuestions: Question[] = [
  {
    id: 1,
    text: "다음 대화를 읽고 질문에 답하세요: \nA: 안녕하세요. 오늘 기분이 어떠세요?\nB: 좋아요. 감사합니다.",
    options: ["기분", "날씨", "위치", "시간"],
    correctIndex: 0,
  },
  {
    id: 2,
    text: "다음 문장을 읽고 올바른 답을 고르세요: \n내일은 친구와 함께 영화를 보러 갈 예정입니다.",
    options: ["오늘 일정", "내일 일정", "어제 일정", "장소 선택"],
    correctIndex: 1,
  },
  {
    id: 3,
    text: "다음 대화를 읽고 질문에 답하세요: \nA: 점심 먹었어요?\nB: 네, 맛있게 먹었어요.",
    options: ["점심 여부", "저녁 여부", "아침 여부", "간식 여부"],
    correctIndex: 0,
  },
  {
    id: 4,
    text: "다음 문장을 읽고 올바른 답을 고르세요: \n오늘 날씨가 매우 추워서 외투를 입고 나갔습니다.",
    options: ["더움", "추움", "비", "눈"],
    correctIndex: 1,
  },
  {
    id: 5,
    text: "다음 대화를 읽고 질문에 답하세요: \nA: 버스가 언제 도착합니까?\nB: 10분 후에 도착합니다.",
    options: ["도착 시간", "출발 시간", "요금", "노선"],
    correctIndex: 0,
  },
  {
    id: 6,
    text: "다음 문장을 읽고 올바른 답을 고르세요: \n저는 한국어 공부를 매일 하고 있습니다.",
    options: ["주 1회", "매일", "한 달에 한 번", "가끔"],
    correctIndex: 1,
  },
  {
    id: 7,
    text: "다음 대화를 읽고 질문에 답하세요: \nA: 취미가 뭐예요?\nB: 저는 그림 그리기를 좋아합니다.",
    options: ["음악", "그림 그리기", "운동", "요리"],
    correctIndex: 1,
  },
  {
    id: 8,
    text: "다음 문장을 읽고 올바른 답을 고르세요: \n저녁 식사 후에 산책을 했습니다.",
    options: ["아침 산책", "점심 산책", "저녁 산책", "밤 산책"],
    correctIndex: 2,
  },
  {
    id: 9,
    text: "다음 대화를 읽고 질문에 답하세요: \nA: 어디에서 점심을 먹을까요?\nB: 새로 생긴 식당에 가요.",
    options: ["집", "학교", "식당", "카페"],
    correctIndex: 2,
  },
  {
    id: 10,
    text: "다음 문장을 읽고 올바른 답을 고르세요: \n저는 매주 토요일에 친구와 축구를 합니다.",
    options: ["월요일", "수요일", "토요일", "금요일"],
    correctIndex: 2,
  },
];


  const questions = activeTab === "listening" ? listeningQuestions : readingQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  // Play audio
  const playAudio = async () => {
    try {
      if (!currentQuestion.audioUrl) return;
      if (sound) await sound.unloadAsync();
      const { sound: newSound } = await Audio.Sound.createAsync(currentQuestion.audioUrl);
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) setIsPlaying(false);
      });
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  // Option click
  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // prevent multiple clicks
    setSelectedOption(index);
    setShowAnswer(true);
    if (index === currentQuestion.correctIndex) setScore(score + 1);
  };

  // Next question
  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setExamFinished(true);
    }
  };

  // Cleanup audio
  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync(); // no await needed
    };
  }, [sound]);

  if (examFinished) {
    return (
      <View style={[styles.container, isDark && styles.containerDark, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
  <View style={[styles.card, isDark && styles.cardDark]}>
    <Text style={[styles.finalScore, isDark && styles.finalScoreDark]}>
      🎉 Exam Finished! {"\n"}
      <Text style={{ fontSize: 32 }}>{score} / {questions.length}</Text>
    </Text>

    <Text style={[styles.message, isDark && styles.messageDark]}>
      Great job! You completed the mock exam.
    </Text>

    <TouchableOpacity style={[styles.restartBtn, isDark && styles.restartBtnDark]} onPress={() => {
      setExamFinished(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setActiveTab("listening");
    }}>
      <Text style={styles.restartTxt}>Restart Exam</Text>
    </TouchableOpacity>
  </View>
</View>

    );
  }

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]} contentContainerStyle={{ padding: 16 }}>
      {/* Tabs */}
      <View style={[styles.tabs, isDark && styles.tabsDark]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "listening" && styles.activeTab, isDark && activeTab === "listening" && styles.activeTabDark]}
          onPress={() => {
            setActiveTab("listening");
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setScore(0);
            setShowAnswer(false);
          }}
        >
          <Text style={[styles.tabText, activeTab === "listening" && styles.activeText, isDark && styles.tabTextDark]}>
            Listening
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "reading" && styles.activeTab, isDark && activeTab === "reading" && styles.activeTabDark]}
          onPress={() => {
            setActiveTab("reading");
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setScore(0);
            setShowAnswer(false);
          }}
        >
          <Text style={[styles.tabText, activeTab === "reading" && styles.activeText, isDark && styles.tabTextDark]}>
            Reading
          </Text>
        </TouchableOpacity>
      </View>

      {/* Image (only for listening) */}
      {activeTab === "listening" && currentQuestion.image && (
        <Image source={currentQuestion.image} style={{ width: "100%", height: 170, marginBottom: 16 }} resizeMode="contain" />
      )}

      {/* Audio (only for listening) */}
      {activeTab === "listening" && currentQuestion.audioUrl && (
        <TouchableOpacity style={styles.audioBtn} onPress={playAudio}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
          <Text style={styles.audioText}>Play Audio</Text>
        </TouchableOpacity>
      )}

      {/* Question */}
      <Text style={[styles.question, isDark && styles.questionDark]}>{currentQuestion.text}</Text>

      {/* Options */}
      <View style={{ marginTop: 16 }}>
        {currentQuestion.options.map((opt, i) => {
          let bgColor = "#fff";
          if (showAnswer) {
            if (i === currentQuestion.correctIndex) bgColor = "#4CAF50";
            else if (i === selectedOption) bgColor = "#f44336";
          }
          return (
            <TouchableOpacity
              key={i}
              onPress={() => handleOptionClick(i)}
              style={[styles.optionBtn, { backgroundColor: bgColor }]}
              disabled={showAnswer}
            >
              <Text style={{ color: showAnswer && i === currentQuestion.correctIndex ? "#fff" : "#333", fontWeight: "600" }}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next button */}
      {showAnswer && (
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>Next Question</Text>
        </TouchableOpacity>
      )}

      <Text style={{ marginTop: 16, fontWeight: "700", color: isDark ? "#fff" : "#333" }}>
        Question {currentQuestionIndex + 1} / {questions.length} | Score: {score}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#121212" },
  tabs: { flexDirection: "row", marginVertical: 16, backgroundColor: "#f0f0f0", borderRadius: 10 ,marginTop:1},
  tabsDark: { backgroundColor: "#1E1E1E" },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 8 },
  activeTab: { backgroundColor: "#667eea" },
  activeTabDark: { backgroundColor: "#4b59c1" },
  tabText: { color: "#666", fontWeight: "600" },
  tabTextDark: { color: "#ccc" },
  activeText: { color: "#fff", fontWeight: "700" },
  audioBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#667eea", padding: 12, borderRadius: 10, marginBottom: 12 },
  audioText: { color: "#fff", marginLeft: 8, fontWeight: "700" },
  question: { fontSize: 18, fontWeight: "700", marginTop: 1, color: "#333" },
  questionDark: { color: "#fff" },
  optionBtn: { padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#e0e0e0", marginBottom: 8 },
  nextBtn: { backgroundColor: "#4CAF50", padding: 14, borderRadius: 10, marginTop: 16, alignItems: "center" },
  submitBtn: { backgroundColor: "#4CAF50", paddingVertical: 14, marginHorizontal: 26, marginTop: 30, borderRadius: 12, alignItems: "center" },
  submitBtnDark: { backgroundColor: "#388e3c" },
  submitTxt: { color: "#fff", fontWeight: "700" },
 // finalScore: { fontSize: 24, fontWeight: "700", textAlign: "center", marginTop: 100, color: "#333" },
 // finalScoreDark: { color: "#fff" },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  cardDark: {
    backgroundColor: "#1E1E1E",
    shadowOpacity: 0.25,
  },
  finalScore: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
  },
  finalScoreDark: {
    color: "#fff",
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginVertical: 20,
    textAlign: "center",
  },
  messageDark: {
    color: "#ccc",
  },
  restartBtn: {
    backgroundColor: "#667eea",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#667eea",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  restartBtnDark: {
    backgroundColor: "#4b59c1",
    shadowColor: "#4b59c1",
  },
  restartTxt: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  }
});
