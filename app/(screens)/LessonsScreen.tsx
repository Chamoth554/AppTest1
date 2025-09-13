// screens/LessonsScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import { useTheme } from "./ThemeContext";

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  level: "Beginner" | "Intermediate" | "Advanced";
  content: { korean: string; english: string; sinhala: string }[];
}

const lessons: Lesson[] = [
  // ---------------- Beginner ----------------
  // ---------------- Beginner ----------------
  {
    id: "b1",
    title: "Basic Greetings - මූලික ආයුබෝවන් - 기본 인사",
    description: "• Learn essential greetings\n• මූලික ආයුබෝවන් ඉගෙන ගන්න\n• 기본 인사를 배우기",
    completed: true,
    level: "Beginner",
    content: [
      { korean: "안녕하세요 👋", english: "Hello", sinhala: "ආයුබෝවන්" },
      { korean: "안녕히 가세요 👋", english: "Goodbye", sinhala: "ගිහින් එන්න" },
      { korean: "감사합니다 🙏", english: "Thank you", sinhala: "ස්තුතියි" },
      { korean: "죄송합니다 😔", english: "Sorry", sinhala: "කනගාටුයි" },
    ],
  },
  {
    id: "b2",
    title: "Numbers 1–10 - අංක 1–10 - 숫자 1–10",
    description: "• Counting basics\n• අංක ගණන ඉගෙන ගන්න\n• 숫자 배우기",
    completed: true,
    level: "Beginner",
    content: [
      { korean: "하나", english: "One", sinhala: "එක" },
      { korean: "둘", english: "Two", sinhala: "දෙක" },
      { korean: "셋", english: "Three", sinhala: "තුන" },
      { korean: "넷", english: "Four", sinhala: "හතර" },
      { korean: "다섯", english: "Five", sinhala: "පහ" },
      { korean: "여섯", english: "Six", sinhala: "හය" },
      { korean: "일곱", english: "Seven", sinhala: "හත" },
      { korean: "여덟", english: "Eight", sinhala: "අට" },
      { korean: "아홉", english: "Nine", sinhala: "නවය" },
      { korean: "열", english: "Ten", sinhala: "දසය" },
    ],
  },
  {
    id: "b3",
    title: "Colors - වර්ණ - 색깔",
    description: "• Basic colors\n• මූලික වර්ණ\n• 기본 색깔",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "빨강 🔴", english: "Red", sinhala: "රතු" },
      { korean: "파랑 🔵", english: "Blue", sinhala: "නිල්" },
      { korean: "초록 🟢", english: "Green", sinhala: "කොළ" },
      { korean: "노랑 🟡", english: "Yellow", sinhala: "කහ" },
      { korean: "검정 ⚫", english: "Black", sinhala: "කලු" },
      { korean: "하얀 ⚪", english: "White", sinhala: "සුදු" },
    ],
  },
  {
    id: "b4",
    title: "Food - ආහාර - 음식",
    description: "• Common foods\n• පොදුවේ භාවිතා කරන ආහාර\n• 일반 음식",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "밥 🍚", english: "Rice", sinhala: "බත්" },
      { korean: "빵 🍞", english: "Bread", sinhala: "පැන්" },
      { korean: "물 💧", english: "Water", sinhala: "ජලය" },
      { korean: "고기 🥩", english: "Meat", sinhala: "මස්" },
      { korean: "과일 🍎", english: "Fruit", sinhala: "පළතුරු" },
    ],
  },
  {
    id: "b5",
    title: "Animals - සතුන් - 동물",
    description: "• Basic animals\n• මූලික සතුන්\n• 기본 동물",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "개 🐶", english: "Dog", sinhala: "බල්ලා" },
      { korean: "고양이 🐱", english: "Cat", sinhala: "පූසා" },
      { korean: "새 🐦", english: "Bird", sinhala: "කුරුල්ලා" },
      { korean: "말 🐴", english: "Horse", sinhala: "අශ්වයා" },
    ],
  },
  {
    id: "b6",
    title: "Time - කාලය - 시간",
    description: "• Telling time\n• කාලය කියා දීම\n• 시간 말하기",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "오늘", english: "Today", sinhala: "අද" },
      { korean: "내일", english: "Tomorrow", sinhala: "හෙට" },
      { korean: "어제", english: "Yesterday", sinhala: "ඊයේ" },
      { korean: "시 ⏰", english: "Hour", sinhala: "පැය" },
      { korean: "분 ⏱️", english: "Minute", sinhala: "මිනිත්තුව" },
    ],
  },
  {
    id: "b7",
    title: "Places - ස්ථාන - 장소",
    description: "• Common places\n• පොදුවේ යන ස්ථාන\n• 일반 장소",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "학교 🏫", english: "School", sinhala: "පාසල" },
      { korean: "집 🏠", english: "Home", sinhala: "ගෙදර" },
      { korean: "가게 🏪", english: "Shop", sinhala: "කඩය" },
      { korean: "병원 🏥", english: "Hospital", sinhala: "රෝහල" },
    ],
  },
  {
    id: "b8",
    title: "Weather - කාලගුණ - 날씨",
    description: "• Weather words\n• කාලගුණ වචන\n• 날씨 단어",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "비 🌧️", english: "Rain", sinhala: "වැස්ස" },
      { korean: "눈 ❄️", english: "Snow", sinhala: "හිම" },
      { korean: "해 ☀️", english: "Sun", sinhala: "හිරු" },
      { korean: "바람 🌬️", english: "Wind", sinhala: "සුළඟ" },
    ],
  },
  {
    id: "b9",
    title: "School - පාසල - 학교",
    description: "• School items\n• පාසල් භාණ්ඩ\n• 학교 용품",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "책 📚", english: "Book", sinhala: "පොත" },
      { korean: "연필 ✏️", english: "Pencil", sinhala: "පැන්සල" },
      { korean: "공책 📝", english: "Notebook", sinhala: "නාමාවලි" },
      { korean: "교실 🏫", english: "Classroom", sinhala: "පන්ති" },
    ],
  },
  {
    id: "b10",
    title: "Hobbies - අඩවි - 취미",
    description: "• Hobby words\n• අමතර කටයුතු වචන\n• 취미 단어",
    completed: false,
    level: "Beginner",
    content: [
      { korean: "노래 🎤", english: "Singing", sinhala: "ගායනය" },
      { korean: "춤 💃", english: "Dancing", sinhala: "නර්තනය" },
      { korean: "독서 📖", english: "Reading", sinhala: "කියවීම" },
      { korean: "여행 ✈️", english: "Traveling", sinhala: "ගමන් කිරීම" },
    ],
  },

// ---------------- Intermediate ----------------
{
  id: "i1",
  title: "Family - පවුල - 가족",
  description: "• Family members\n• පවුලේ සාමාජිකයින්\n• 가족 구성원",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "어머니 👩", english: "Mother", sinhala: "අම්මා" },
    { korean: "아버지 👨", english: "Father", sinhala: "තාත්තා" },
    { korean: "형 👦", english: "Older brother", sinhala: "අයියා" },
    { korean: "누나 👧", english: "Older sister", sinhala: "අක්කා" },
    { korean: "동생 🧒", english: "Younger sibling", sinhala: "අනුක" },
    { korean: "할머니 👵", english: "Grandmother", sinhala: "අජා" },
    { korean: "할아버지 👴", english: "Grandfather", sinhala: "අජාපියා" },
  ],
},
{
  id: "i2",
  title: "Days of the Week - සතියේ දවස් - 요일",
  description: "• Korean weekdays\n• සතියේ දවස්\n• 한국 요일",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "월요일 📅", english: "Monday", sinhala: "සඳුදා" },
    { korean: "화요일 📅", english: "Tuesday", sinhala: "අඟහරුවාදා" },
    { korean: "수요일 📅", english: "Wednesday", sinhala: "බදාදා" },
    { korean: "목요일 📅", english: "Thursday", sinhala: "බ්‍රහස්පතින්දා" },
    { korean: "금요일 📅", english: "Friday", sinhala: "සිකුරාදා" },
    { korean: "토요일 📅", english: "Saturday", sinhala: "සෙනසුරාදා" },
    { korean: "일요일 📅", english: "Sunday", sinhala: "ඉරිදා" },
  ],
},
{
  id: "i3",
  title: "Months of the Year - වසරේ මාස - 달",
  description: "• Learn Korean months\n• මාස\n• 한국 달",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "일월 🗓️", english: "January", sinhala: "ජනවාරි" },
    { korean: "이월 🗓️", english: "February", sinhala: "පෙබරවාරි" },
    { korean: "삼월 🗓️", english: "March", sinhala: "මාර්තු" },
    { korean: "사월 🗓️", english: "April", sinhala: "අප්රේල්" },
    { korean: "오월 🗓️", english: "May", sinhala: "මැයි" },
    { korean: "유월 🗓️", english: "June", sinhala: "ජූනි" },
    { korean: "칠월 🗓️", english: "July", sinhala: "ජූලි" },
    { korean: "팔월 🗓️", english: "August", sinhala: "අගෝස්තු" },
    { korean: "구월 🗓️", english: "September", sinhala: "සැප්තැම්බර්" },
    { korean: "시월 🗓️", english: "October", sinhala: "ඔක්තෝබර්" },
  ],
},
{
  id: "i4",
  title: "Professions - රැකියා - 직업",
  description: "• Jobs in Korean\n• රැකියා\n• 한국 직업",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "의사 🩺", english: "Doctor", sinhala: "ඩොක්ටර්" },
    { korean: "간호사 💊", english: "Nurse", sinhala: "හෙද" },
    { korean: "교사 👩‍🏫", english: "Teacher", sinhala: "ගුරු" },
    { korean: "학생 👨‍🎓", english: "Student", sinhala: "ශිෂ්‍ය" },
    { korean: "경찰관 👮", english: "Police officer", sinhala: "පොලිස්කාරයා" },
    { korean: "소방관 🚒", english: "Firefighter", sinhala: "ගිනිකරුවා" },
    { korean: "농부 🌾", english: "Farmer", sinhala: "ගොවියා" },
    { korean: "요리사 👨‍🍳", english: "Chef", sinhala: "කූව" },
    { korean: "운전사 🚗", english: "Driver", sinhala: "රියදුරු" },
    { korean: "가수 🎤", english: "Singer", sinhala: "ගායන ශිල්පියෙක්" },
  ],
},
{
  id: "i5",
  title: "Travel - ගමන් - 여행",
  description: "• Travel vocabulary\n• ගමන් වචන\n• 여행 단어",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "여행 ✈️", english: "Trip", sinhala: "ගමන්" },
    { korean: "비행기 🛫", english: "Airplane", sinhala: "ගුවන්යානාව" },
    { korean: "기차 🚆", english: "Train", sinhala: "දුම්රිය" },
    { korean: "호텔 🏨", english: "Hotel", sinhala: "හෝටලය" },
    { korean: "지도 🗺️", english: "Map", sinhala: "සිතියම" },
    { korean: "여권 🛂", english: "Passport", sinhala: "ගමන් බලපත්රය" },
    { korean: "비자 📝", english: "Visa", sinhala: "වීසා" },
    { korean: "관광 🏛️", english: "Sightseeing", sinhala: "චාරිකාව" },
    { korean: "해변 🏖️", english: "Beach", sinhala: "මහ වෙරළ" },
    { korean: "산 🏔️", english: "Mountain", sinhala: "ගිරිය" },
  ],
},
{
  id: "i6",
  title: "Shopping - සාප්පු - 쇼핑",
  description: "• Shopping vocabulary\n• සාප්පු වචන\n• 쇼핑 단어",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "시장 🏪", english: "Market", sinhala: "පොළ" },
    { korean: "가게 🏬", english: "Shop", sinhala: "සාප්පු" },
    { korean: "가격 💰", english: "Price", sinhala: "මිල" },
    { korean: "할인 🔖", english: "Discount", sinhala: "වට්ටම්" },
    { korean: "돈 💵", english: "Money", sinhala: "මුදල්" },
    { korean: "지갑 👛", english: "Wallet", sinhala: "පසුම්බිය" },
    { korean: "카드 💳", english: "Card", sinhala: "කාඩ්පත" },
    { korean: "물건 📦", english: "Item", sinhala: "වස්තුව" },
    { korean: "옷 👕", english: "Clothes", sinhala: "ඇඳුම්" },
    { korean: "신발 👟", english: "Shoes", sinhala: "සපත්තු" },
  ],
},
{
  id: "i7",
  title: "Health - සෞඛ්‍යය - 건강",
  description: "• Health vocabulary\n• සෞඛ්‍යය\n• 건강 단어",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "병원 🏥", english: "Hospital", sinhala: "රෝහල" },
    { korean: "약 💊", english: "Medicine", sinhala: "ඖෂධය" },
    { korean: "아프다 🤒", english: "Sick", sinhala: "අසනීප" },
    { korean: "의사 🩺", english: "Doctor", sinhala: "ඩොක්ටර්" },
    { korean: "간호사 👩‍⚕️", english: "Nurse", sinhala: "හෙද" },
    { korean: "건강 💪", english: "Health", sinhala: "සෞඛ්‍යය" },
    { korean: "운동 🏋️", english: "Exercise", sinhala: "ව්‍යායාමය" },
    { korean: "치과 🦷", english: "Dentist", sinhala: "දන්තවෛද්‍ය" },
    { korean: "피 🩸", english: "Blood", sinhala: "ලේ" },
    { korean: "머리 🧠", english: "Head", sinhala: "තිල" },
  ],
},
{
  id: "i8",
  title: "Directions - දිශානති - 방향",
  description: "• Directions vocabulary\n• දිශානති\n• 방향 단어",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "왼쪽 ⬅️", english: "Left", sinhala: "වම" },
    { korean: "오른쪽 ➡️", english: "Right", sinhala: "දකුණ" },
    { korean: "앞 ⬆️", english: "Front", sinhala: "මුහුණ" },
    { korean: "뒤 ⬇️", english: "Back", sinhala: "පිටුපස" },
    { korean: "옆 ➡️⬅️", english: "Beside", sinhala: "ඇලගෙ" },
    { korean: "근처 📍", english: "Nearby", sinhala: "ලග" },
    { korean: "멀리 🌄", english: "Far", sinhala: "දුර" },
    { korean: "길 🛣️", english: "Road", sinhala: "මාර්ගය" },
    { korean: "다리 🌉", english: "Bridge", sinhala: "පාලම" },
    { korean: "신호등 🚦", english: "Traffic light", sinhala: "ගමන් බදු දර්ශකය" },
  ],
},
{
  id: "i9",
  title: "Nature - ස්වභාවය - 자연",
  description: "• Nature vocabulary\n• ස්වභාවය\n• 자연 단어",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "나무 🌳", english: "Tree", sinhala: "ගස" },
    { korean: "꽃 🌸", english: "Flower", sinhala: "මල්" },
    { korean: "강 🌊", english: "River", sinhala: "ගඟ" },
    { korean: "산 🏔️", english: "Mountain", sinhala: "ගිරිය" },
    { korean: "바다 🌊", english: "Sea", sinhala: "ගගරළ" },
    { korean: "하늘 ☁️", english: "Sky", sinhala: "අහස" },
    { korean: "별 ⭐", english: "Star", sinhala: "තරුව" },
    { korean: "해 🌞", english: "Sun", sinhala: "හිරු" },
    { korean: "달 🌙", english: "Moon", sinhala: "ඳුන්න" },
    { korean: "돌 🪨", english: "Stone", sinhala: "ගල්" },
  ],
},
{
  id: "i10",
  title: "Emotions - හැඟීම් - 감정",
  description: "• Express feelings\n• හැඟීම්\n• 감정",
  completed: false,
  level: "Intermediate",
  content: [
    { korean: "행복하다 😄", english: "Happy", sinhala: "සතුටු" },
    { korean: "슬프다 😢", english: "Sad", sinhala: "දුක" },
    { korean: "화나다 😡", english: "Angry", sinhala: "කෝපි" },
    { korean: "무섭다 😱", english: "Scared", sinhala: "භය" },
    { korean: "피곤하다 😴", english: "Tired", sinhala: "මඳ" },
    { korean: "놀라다 😮", english: "Surprised", sinhala: "අල්ම" },
    { korean: "외롭다 😔", english: "Lonely", sinhala: "එකලා" },
    { korean: "긴장하다 😬", english: "Nervous", sinhala: "අැඟවීම" },
    { korean: "사랑하다 ❤️", english: "Love", sinhala: "ආදරය" },
    { korean: "걱정하다 😟", english: "Worried", sinhala: "කනගාටු" },
  ],
},


 // ---------------- Advanced ----------------
{
  id: "a1",
  title: "Polite Expressions - ගෞරව පද - 존댓말",
  description: "• Honorific speech\n• ගෞරව භාවිතා කරන වචන\n• 존댓말",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "드리다 🙇‍♂️", english: "To give (honorific)", sinhala: "දෙනවා (ගෞරව)" },
    { korean: "계시다 👴👵", english: "To be (honorific)", sinhala: "සිටින්නවා (ගෞරව)" },
  ],
},
{
  id: "a2",
  title: "Idioms - රූපක වාක්‍ය - 관용구",
  description: "• Korean idioms\n• රූපක වාක්‍ය\n• 관용구",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "가는 말이 고와야 오는 말이 곱다 💬", english: "Speak kindly to hear kindly", sinhala: "හොඳින් කතා කළොත් හොඳින් අහන්න ලැබේ" },
    { korean: "시작이 반이다 🚀", english: "Starting is half the task", sinhala: "අරඹීම අර්ධයයි" },
  ],
},
{
  id: "a3",
  title: "Culture - සංස්කෘතිය - 문화",
  description: "• Learn Korean cultural terms\n• සංස්කෘතිය\n• 문화",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "문화 🏛️", english: "Culture", sinhala: "සංස්කෘතිය" },
    { korean: "전통 🏺", english: "Tradition", sinhala: "පැරැණි සම්ප්‍රදාය" },
    { korean: "예술 🎨", english: "Art", sinhala: "කලා" },
    { korean: "음악 🎵", english: "Music", sinhala: "සංගීතය" },
    { korean: "춤 💃", english: "Dance", sinhala: "නර්තනය" },
    { korean: "축제 🎉", english: "Festival", sinhala: "උත්සවය" },
    { korean: "한복 👘", english: "Hanbok (Korean dress)", sinhala: "හන්බොක්" },
    { korean: "음식 🍲", english: "Food", sinhala: "කෑම" },
    { korean: "사람들 🧑‍🤝‍🧑", english: "People", sinhala: "මිනිසුන්" },
    { korean: "역사 📜", english: "History", sinhala: "ඉතිහාසය" },
  ],
},
{
  id: "a4",
  title: "Business - ව්‍යාපාර - 비즈니스",
  description: "• Business and work terms\n• ව්‍යාපාරය\n• 비즈니스",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "회사 🏢", english: "Company", sinhala: "සමාගම" },
    { korean: "사무실 🖇️", english: "Office", sinhala: "කාර්යාලය" },
    { korean: "직원 👨‍💼", english: "Employee", sinhala: "සේවකයා" },
    { korean: "회의 🗣️", english: "Meeting", sinhala: "සමාවේ" },
    { korean: "계약 ✍️", english: "Contract", sinhala: "ගිවිසුම" },
    { korean: "보고서 📄", english: "Report", sinhala: "වාර්තාව" },
    { korean: "거래 💱", english: "Transaction", sinhala: "ගනුදෙනුව" },
    { korean: "고객 🧑‍💼", english: "Client", sinhala: "ගනුදෙනුකරු" },
    { korean: "수입 💵", english: "Income", sinhala: "ආදායම" },
    { korean: "지출 💸", english: "Expense", sinhala: "වියදම" },
  ],
},
{
  id: "a5",
  title: "Idioms & Grammar - වාක්‍ය රචනය - 문법",
  description: "• Important idioms and grammar\n• වාක්‍ය රචනය\n• 문법",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "손을 잡다 🤝", english: "Cooperate (hold hands)", sinhala: "අතට අත දීම" },
    { korean: "눈이 높다 👀", english: "Have high standards", sinhala: "ඉහළ මනෝභාවය" },
    { korean: "귀가 얇다 👂", english: "Easily influenced", sinhala: "ඇහුම්කන් ලුහුබඳු" },
    { korean: "문법 📚", english: "Grammar", sinhala: "ව්‍යාකරණය" },
    { korean: "문장 📝", english: "Sentence", sinhala: "වাক්‍යය" },
    { korean: "단어 🔤", english: "Word", sinhala: "ශබ්දය" },
    { korean: "주어 👤", english: "Subject", sinhala: "කර්තෘ" },
    { korean: "동사 🏃", english: "Verb", sinhala: "ක්‍රියාපදය" },
    { korean: "형용사 🖊️", english: "Adjective", sinhala: "විශේෂණය" },
    { korean: "부사 💬", english: "Adverb", sinhala: "කාර්ය විශේෂණය" },
  ],
},
{
  id: "a6",
  title: "Technology - තාක්ෂණය - 기술",
  description: "• Modern technology terms\n• තාක්ෂණය\n• 기술",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "컴퓨터 💻", english: "Computer", sinhala: "පරිගණකය" },
    { korean: "인터넷 🌐", english: "Internet", sinhala: "අන්තර්ජාලය" },
    { korean: "스마트폰 📱", english: "Smartphone", sinhala: "ස්මාර්ට්ෆෝනය" },
    { korean: "앱 📲", english: "App", sinhala: "යෙදුම" },
    { korean: "게임 🎮", english: "Game", sinhala: "ඇත්තේ" },
    { korean: "인공지능 🤖", english: "Artificial Intelligence", sinhala: "කෘතිම බුද්ධිය" },
    { korean: "로봇 🤖", english: "Robot", sinhala: "රොබෝව" },
    { korean: "프로그래밍 💻", english: "Programming", sinhala: "පරිගණක වැඩසටහන් කිරීම" },
    { korean: "데이터 📊", english: "Data", sinhala: "දත්ත" },
    { korean: "보안 🔒", english: "Security", sinhala: "ආරක්ෂාව" },
  ],
},
{
  id: "a7",
  title: "Literature - සාහිත්‍යය - 문학",
  description: "• Korean literature vocabulary\n• සාහිත්‍යය\n• 문학",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "문학 📚", english: "Literature", sinhala: "සාහිත්‍යය" },
    { korean: "책 📖", english: "Book", sinhala: "පොත" },
    { korean: "작가 🖋️", english: "Writer", sinhala: "කතුවරයා" },
    { korean: "시 📝", english: "Poem", sinhala: "කවිය" },
    { korean: "소설 📕", english: "Novel", sinhala: "ප්‍රබන්ධය" },
    { korean: "독서 📖", english: "Reading", sinhala: "පිටු කියවීම" },
    { korean: "출판 🏷️", english: "Publishing", sinhala: "ප්‍රකාශනය" },
    { korean: "문장 ✍️", english: "Sentence", sinhala: "වාක්‍යය" },
    { korean: "언어 🗣️", english: "Language", sinhala: "භාෂාව" },
    { korean: "교육 🎓", english: "Education", sinhala: "අධ්‍යාපනය" },
  ],
},
{
  id: "a8",
  title: "History - ඉතිහාසය - 역사",
  description: "• Korean history vocabulary\n• ඉතිහාසය\n• 역사",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "역사 📜", english: "History", sinhala: "ඉතිහාසය" },
    { korean: "왕 👑", english: "King", sinhala: "රාජතුමා" },
    { korean: "여왕 👸", english: "Queen", sinhala: "රැජින" },
    { korean: "전쟁 ⚔️", english: "War", sinhala: "සංඝර්ෂය" },
    { korean: "평화 ☮️", english: "Peace", sinhala: "සම" },
    { korean: "시대 ⏳", english: "Era", sinhala: "යුගය" },
    { korean: "제국 🏰", english: "Empire", sinhala: "රාජ්‍යය" },
    { korean: "혁명 🔥", english: "Revolution", sinhala: "විප්ලවය" },
    { korean: "문화재 🏛️", english: "Cultural heritage", sinhala: "සංස්කෘතික උරුමය" },
    { korean: "기록 📖", english: "Record", sinhala: "අදහස් සටහන්" },
  ],
},
{
  id: "a9",
  title: "Society - සමාජය - 사회",
  description: "• Korean society and community\n• සමාජය\n• 사회",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "사회 🏘️", english: "Society", sinhala: "සමාජය" },
    { korean: "사람 🧑", english: "Person", sinhala: "මිනිසෙක්" },
    { korean: "가족 👪", english: "Family", sinhala: "පවුල" },
    { korean: "친구 👫", english: "Friend", sinhala: "යහළුවා" },
    { korean: "이웃 🏘️", english: "Neighbor", sinhala: "අසල්වැසි" },
    { korean: "지역 🗺️", english: "Region", sinhala: "ප්‍රදේශය" },
    { korean: "도시 🌆", english: "City", sinhala: "නගරය" },
    { korean: "농촌 🌾", english: "Countryside", sinhala: "ග්‍රාමීය" },
    { korean: "정부 🏛️", english: "Government", sinhala: "රජය" },
    { korean: "법 ⚖️", english: "Law", sinhala: "නීතිය" },
  ],
},
{
  id: "a10",
  title: "Advanced Emotions & Expressions - හැඟීම් සහ ප්‍රකාශන - 감정과 표현",
  description: "• Complex emotions and expressions\n• හැඟීම් සහ ප්‍රකාශන\n• 감정과 표현",
  completed: false,
  level: "Advanced",
  content: [
    { korean: "존경 🙏", english: "Respect", sinhala: "ගෞරවය" },
    { korean: "자부심 🏆", english: "Pride", sinhala: "අභිමානය" },
    { korean: "동정 💖", english: "Compassion", sinhala: "කරුණාව" },
    { korean: "용기 💪", english: "Courage", sinhala: "ධෛර්යය" },
    { korean: "인내 ⏳", english: "Patience", sinhala: "සහනය" },
    { korean: "희망 🌟", english: "Hope", sinhala: "ආශාව" },
    { korean: "절망 😞", english: "Despair", sinhala: "අසමත්භාවය" },
    { korean: "긴급 🚨", english: "Urgency", sinhala: "හදිසි" },
    { korean: "자유 🕊️", english: "Freedom", sinhala: "ස්වাতන්ත්‍රය" },
    { korean: "평등 ⚖️", english: "Equality", sinhala: "සමානාත්මතාව" },
  ],
},

];

interface Props {
  navigate: (s: ScreenName) => void;
}

export default function LessonsScreen({ navigate }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeLevel, setActiveLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filteredLessons = lessons.filter((l) => l.level === activeLevel);

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigate("dashboard")}>
          <Ionicons name="chevron-back" size={22} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.title, isDark && styles.titleDark]}>Lessons</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => {
          const active = activeLevel === level;
          return (
            <TouchableOpacity
              key={level}
              style={[
                styles.filterBtn,
                active ? (isDark ? styles.filterBtnDark : styles.filterBtn) : (isDark ? styles.inactiveBtnDark : styles.inactiveBtn),
              ]}
              onPress={() => {
                setActiveLevel(level);
                setExpanded(null);
              }}
            >
              <Text style={active ? styles.filterBtnText : isDark ? styles.inactiveTextDark : styles.inactiveText}>
                {level}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Lessons */}
      <ScrollView style={styles.list}>
        {filteredLessons.map((l) => {
          const isOpen = expanded === l.id;
          return (
            <View key={l.id}>
              <TouchableOpacity
                style={[styles.card, isDark && styles.cardDark]}
                onPress={() => setExpanded(isOpen ? null : l.id)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>{l.title}</Text>
                  <Text style={[styles.cardDesc, isDark && styles.cardDescDark]}>{l.description}</Text>
                  <Text style={[styles.cardLevel, isDark && styles.cardLevelDark]}>{l.level}</Text>
                </View>
                <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color={isDark ? "#fff" : "#333"} />
                {l.completed && <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={{ marginLeft: 6 }} />}
              </TouchableOpacity>

              {/* Expanded Content */}
              {isOpen && (
                <View style={[styles.contentBox, isDark && styles.contentBoxDark]}>
                  <View style={styles.grid}>
                    {l.content.map((item, idx) => (
                      <View key={idx} style={[styles.gridItem, isDark && styles.gridItemDark]}>
                        <Text style={[styles.korean, isDark && styles.koreanDark]}>{item.korean}</Text>
                        <Text style={[styles.english, isDark && styles.englishDark]}>{item.english}</Text>
                        <Text style={[styles.sinhala, isDark && styles.sinhalaDark]}>{item.sinhala}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginBottom: 50 },
  containerDark: { backgroundColor: "#121212" },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  headerDark: { borderBottomColor: "#333" },

  title: { fontSize: 18, fontWeight: "700", color: "#333" },
  titleDark: { color: "#fff" },

  filterRow: { flexDirection: "row", justifyContent: "space-around", padding: 12 },
  filterBtn: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: "#667eea" },
  filterBtnDark: { backgroundColor: "#4e5ce0" },
  filterBtnText: { color: "white", fontWeight: "600" },

  inactiveBtn: { backgroundColor: "#f0f0f0", paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  inactiveBtnDark: { backgroundColor: "#1E1E1E", paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  inactiveText: { color: "#666", fontWeight: "600" },
  inactiveTextDark: { color: "#ccc", fontWeight: "600" },

  list: { paddingHorizontal: 16, paddingTop: 8 },

  card: { backgroundColor: "white", borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", elevation: 2 },
  cardDark: { backgroundColor: "#1E1E1E" },

  cardTitle: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 6 },
  cardTitleDark: { color: "#fff" },

  cardDesc: { color: "#666", marginBottom: 6 },
  cardDescDark: { color: "#ccc" },

  cardLevel: { color: "#667eea", fontWeight: "600", fontSize: 12 },
  cardLevelDark: { color: "#8ab4f8" },

  contentBox: { backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8, marginBottom: 12, marginHorizontal: 6 },
  contentBoxDark: { backgroundColor: "#2c2c2c" },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  gridItem: { width: "48%", backgroundColor: "#fff", padding: 10, marginBottom: 10, borderRadius: 8, elevation: 1 },
  gridItemDark: { backgroundColor: "#333" },

  korean: { fontSize: 16, fontWeight: "700", color: "#222" },
  koreanDark: { color: "#fff" },
  english: { fontSize: 14, color: "#555" },
  englishDark: { color: "#ccc" },
  sinhala: { fontSize: 14, color: "#0077cc" },
  sinhalaDark: { color: "#80bfff" },
});
