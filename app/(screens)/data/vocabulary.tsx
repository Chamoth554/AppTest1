// data/vocabulary.ts
export interface VocabWord {
  id: number;
  kor: string;
  eng: string;
  sinhala: string;
  grammar?: string;        // English grammar note
  grammarSinhala?: string; // Sinhala grammar note
  tips?: string;           // English cultural tip
  tipsSinhala?: string;    // Sinhala cultural tip
}

const vocabulary: VocabWord[] = [
  {
    id: 1,
    kor: "안녕하세요",
    eng: "Hello (Formal)",
    sinhala: "ආයුබෝවන්",
    grammar: "Formal greeting used with strangers or elders.",
    grammarSinhala: "නවමු හෝ වැඩිහිටියන් සමඟ භාවිතා කරන ගෞරවාන්විත ආයුබෝවන්.",
    tips: "Always bow slightly when greeting someone older.",
    tipsSinhala: "වැඩිහිටියන් හෝ ගෞරව නමැති පුද්ගලයෙකුට ආයුබෝවන් කියවද්දී සුළු වශයෙන් නමස්කාර කරන්න."
  },
  {
    id: 2,
    kor: "안녕",
    eng: "Hi (Informal)",
    sinhala: "හායි",
    grammar: "Informal greeting used with friends.",
    grammarSinhala: "මිතුරන් සමඟ භාවිතා කරන අවිධිගත ආයුබෝවන්.",
    tips: "Casual tone, use only with peers.",
    tipsSinhala: "සහෘද මිතුරන් සමඟ පමණක් භාවිතා කරන්න."
  },
  {
    id: 3,
    kor: "감사합니다",
    eng: "Thank you (Formal)",
    sinhala: "ස්තූතියි",
    grammar: "Formal way to say thank you.",
    grammarSinhala: "ගෞරවාන්විත ආකාරයෙන් ස්තූතියි කියන විධිය.",
    tips: "Use polite gestures when giving thanks.",
    tipsSinhala: "ස්තූතියි කියද්දී ගෞරවාන්විත භාවිතා කරන්න."
  },
  {
    id: 4,
    kor: "고마워",
    eng: "Thanks (Casual)",
    sinhala: "තැන්ක්ස්",
    grammar: "Informal way to say thank you.",
    grammarSinhala: "අවිධිගත ආකාරයෙන් ස්තූතියි කියන විධිය.",
    tips: "Use with friends or younger people.",
    tipsSinhala: "මිතුරන් හෝ කුඩා වයසේ පුද්ගලයින් සමඟ පමණක් භාවිතා කරන්න."
  },
  {
    id: 5,
    kor: "사랑해요",
    eng: "I love you",
    sinhala: "මම ඔයාව ආදරෙයි",
    grammar: "Expressing love formally.",
    grammarSinhala: "ගෞරවාන්විත ආකාරයෙන් ආදරය ප්‍රකාශ කිරීම.",
    tips: "Use with someone you care about.",
    tipsSinhala: "ඔබට ආදරය කරන පුද්ගලයෙකු සමඟ පමණක් භාවිතා කරන්න."
  },
  {
    id: 6,
    kor: "잘 지내세요?",
    eng: "How are you? (Formal)",
    sinhala: "ඔබ කෙසේද?",
    grammar: "Formal inquiry about someone's well-being.",
    grammarSinhala: "කෙනෙකුගේ තත්වය පිළිබඳ ගෞරවාන්විත විමසීම.",
    tips: "Use with elders or new acquaintances.",
    tipsSinhala: "වැඩිහිටියන් හෝ නව මිතුරන් සමඟ භාවිතා කරන්න."
  },
  {
    id: 7,
    kor: "잘 지내?",
    eng: "How are you? (Informal)",
    sinhala: "කොහොමද?",
    grammar: "Casual inquiry with friends.",
    grammarSinhala: "මිතුරන් සමඟ අවිධිගත විමසීම.",
    tips: "Use only with close friends.",
    tipsSinhala: "ආසන්න මිතුරන් සමඟ පමණක් භාවිතා කරන්න."
  },
  {
    id: 8,
    kor: "죄송합니다",
    eng: "Sorry (Formal)",
    sinhala: "මම සමාව ඉල්ලන්නෙමි",
    grammar: "Formal apology.",
    grammarSinhala: "ගෞරවාන්විත සමාව ඉල්ලීම.",
    tips: "Use when you make mistakes to elders or strangers.",
    tipsSinhala: "වැඩිහිටියන් හෝ අමුතු පුද්ගලයන් සමඟ දෝෂයක් සිදු වුවහොත් භාවිතා කරන්න."
  },
  {
    id: 9,
    kor: "미안",
    eng: "Sorry (Casual)",
    sinhala: "සමාවන්න",
    grammar: "Informal apology.",
    grammarSinhala: "අවිධිගත සමාව ඉල්ලීම.",
    tips: "Use with friends or younger people.",
    tipsSinhala: "මිතුරන් හෝ කුඩා වයසේ පුද්ගලයින් සමඟ භාවිතා කරන්න."
  },
  {
    id: 10,
    kor: "좋아요",
    eng: "Good / I like it",
    sinhala: "හොඳයි / මම කැමතියි",
    grammar: "Used to express approval or agreement.",
    grammarSinhala: "සංවේදීකමක් හෝ එකඟතාවක් ප්‍රකාශ කිරීම සඳහා භාවිතා කරයි.",
    tips: "Use in casual and formal contexts.",
    tipsSinhala: "අවිධිගත සහ ගෞරවාන්විත දෙකේම භාවිතා කළ හැක."
  },
  // Continue in the same format up to id: 50
  { id: 11, kor: "좋은 아침", eng: "Good morning", sinhala: "සුභ උදෑසනක්", grammar: "Used to greet in the morning.", grammarSinhala: "උදෑසන කාලයේදී ආයුබෝවන් කියන ආකාරය.", tips: "Use before noon.", tipsSinhala: "දවල් 12ට පෙර භාවිතා කරන්න." },
  { id: 12, kor: "좋은 밤", eng: "Good night", sinhala: "සුභ රාත්‍රියක්", grammar: "Used to say good night.", grammarSinhala: "රාත්‍රී කාලයේදී සුභ රාත්‍රියක් කියන විධිය.", tips: "Use before sleeping.", tipsSinhala: "නිදාගැනීමට පෙර භාවිතා කරන්න." },
  { id: 13, kor: "안녕히 가세요", eng: "Goodbye (Formal, leaving)", sinhala: "සුරක්ෂිතව යන්න", grammar: "Said to someone leaving.", grammarSinhala: "පිටත් වන පුද්ගලයෙකුට කියන ආකාරය.", tips: "Polite farewell.", tipsSinhala: "ගෞරවාන්විත පිටත් වීමේ සුබ පැතුම." },
  { id: 14, kor: "안녕히 계세요", eng: "Goodbye (Formal, staying)", sinhala: "සුරක්ෂිතව සිටින්න", grammar: "Said to someone staying.", grammarSinhala: "සිටින්නාට කියන ආකාරය.", tips: "Polite farewell.", tipsSinhala: "ගෞරවාන්විත පිටත් වීමේ සුබ පැතුම." },
  { id: 15, kor: "네", eng: "Yes", sinhala: "ඔව්", grammar: "Used to agree or confirm.", grammarSinhala: "එකඟතාව හෝ තහවුරු කිරීම සඳහා භාවිතා කරනවා.", tips: "Use politely in formal situations.", tipsSinhala: "ගෞරවාන්විත අවස්ථා වලදී භාවිතා කරන්න." },
  { id: 16, kor: "아니요", eng: "No", sinhala: "නැහැ", grammar: "Used to disagree or refuse.", grammarSinhala: "අසමත් වීම හෝ ප්‍රතික්ෂේප කිරීම සඳහා භාවිතා කරයි.", tips: "Use politely in formal situations.", tipsSinhala: "ගෞරවාන්විත අවස්ථා වලදී භාවිතා කරන්න." },
  { id: 17, kor: "괜찮아요", eng: "It's okay / I'm fine", sinhala: "හරි / මම හොඳින් සිටිමි", grammar: "Used to reassure or respond positively.", grammarSinhala: "ආරෝග්‍යාත්මකව ප්‍රතිචාර දක්වන විධිය.", tips: "Use in both formal and casual contexts.", tipsSinhala: "ගෞරවාන්විත සහ අවිධිගත දෙකේම භාවිතා කළ හැක." },
  { id: 18, kor: "도와주세요", eng: "Help me, please", sinhala: "කරුණාකර උදව් කරන්න", grammar: "Requesting help formally.", grammarSinhala: "ගෞරවාන්විතව උදව් ඉල්ලා සිටීම.", tips: "Use in emergencies or polite requests.", tipsSinhala: "අනතුරක් හෝ ගෞරවාන්විත ඉල්ලීම් සඳහා භාවිතා කරන්න." },
  { id: 19, kor: "물 주세요", eng: "Water, please", sinhala: "ජලය, කරුණාකර", grammar: "Polite request for water.", grammarSinhala: "ජලය ඉල්ලා සිටීමේ ගෞරවාන්විත විධිය.", tips: "Use in restaurants or polite settings.", tipsSinhala: "ආපන ශාලා හෝ ගෞරවාන්විත අවස්ථා සඳහා භාවිතා කරන්න." },
  { id: 20, kor: "화장실 어디예요?", eng: "Where is the restroom?", sinhala: "ශෛචාලය කොහෙද?", grammar: "Asking politely for location.", grammarSinhala: "ස්ථානයක් සඳහා ගෞරවාන්විත විමසීම.", tips: "Use politely in public places.", tipsSinhala: "ප්‍රජා ස්ථාන වලදී ගෞරවාන්විත ලෙස භාවිතා කරන්න." },
  { id: 21, kor: "얼마예요?", eng: "How much is it?", sinhala: "මේක කොච්චරද?", grammar: "Asking price politely.", grammarSinhala: "මිල සම්බන්ධයෙන් ගෞරවාන්විත විමසීම.", tips: "Use in stores or markets.", tipsSinhala: "සිල්ලර වෙළඳසැල් හෝ වෙළඳපොලේදී භාවිතා කරන්න." },
  { id: 22, kor: "맛있어요", eng: "It's delicious", sinhala: "රසවත්යි", grammar: "Expressing food appreciation.", grammarSinhala: "ආහාරයට ප්‍රසාදය පෙන්වීම.", tips: "Compliment politely.", tipsSinhala: "ගෞරවාන්විතව ප්‍රශංසා කරන්න." },
  { id: 23, kor: "배고파요", eng: "I'm hungry", sinhala: "මට හිමිකම් දැනේ", grammar: "Expressing hunger formally.", grammarSinhala: "ගෞරවාන්විතව බඩගිනි පෙන්වීම.", tips: "Use with peers or in polite context.", tipsSinhala: "සහෘදයින් සමඟ හෝ ගෞරවාන්විත අවස්ථාවලදී භාවිතා කරන්න." },
  { id: 24, kor: "배불러요", eng: "I'm full", sinhala: "මට පිරී ඇත", grammar: "Expressing fullness.", grammarSinhala: "පිරී යාම ප්‍රකාශ කිරීම.", tips: "Say after meals politely.", tipsSinhala: "ආහාරයට පසු ගෞරවාන්විතව කියන්න." },
  { id: 25, kor: "좋아요", eng: "I like it", sinhala: "මට කැමතියි", grammar: "Expressing preference.", grammarSinhala: "අභිරුචිය පෙන්වීම.", tips: "Use casually or formally.", tipsSinhala: "අවිධිගත හෝ ගෞරවාන්විතව භාවිතා කළ හැක." },
  { id: 26, kor: "싫어요", eng: "I don't like it", sinhala: "මට කැමති නැහැ", grammar: "Expressing dislike.", grammarSinhala: "අභිරුචිය නොපෙන්වීම.", tips: "Be polite in formal contexts.", tipsSinhala: "ගෞරවාන්විත අවස්ථාවලදී අනුකූලව කියන්න." },
  { id: 27, kor: "알겠습니다", eng: "I understand", sinhala: "මම තේරුණා", grammar: "Formal acknowledgement.", grammarSinhala: "ගෞරවාන්විත පිළිගැනීම.", tips: "Use in conversations with elders or teachers.", tipsSinhala: "වැඩිහිටියන් හෝ ගුරුවරුන් සමඟ භාවිතා කරන්න." },
  { id: 28, kor: "모르겠어요", eng: "I don't know", sinhala: "මට තේරෙන්නේ නැහැ", grammar: "Expressing lack of knowledge.", grammarSinhala: "ඇත්ත නොදැනීම පෙන්වීම.", tips: "Use politely when unsure.", tipsSinhala: "නොතේරුනොත් ගෞරවාන්විතව භාවිතා කරන්න." },
  { id: 29, kor: "천천히 말해 주세요", eng: "Please speak slowly", sinhala: "කරුණාකර මන්දගාමීව කතා කරන්න", grammar: "Requesting slow speech politely.", grammarSinhala: "මන්දගාමීව කතා කිරීමට ගෞරවාන්විත ඉල්ලීම.", tips: "Use with non-native speakers or teachers.", tipsSinhala: "අවිධිගත හෝ ගුරුවරුන් සමඟ භාවිතා කරන්න." },
  { id: 30, kor: "다시 한 번 말해 주세요", eng: "Please say it again", sinhala: "කරුණාකර නැවත කියන්න", grammar: "Requesting repetition politely.", grammarSinhala: "නැවත කියන ලෙස ගෞරවාන්විත ඉල්ලීම.", tips: "Use when you didn’t understand.", tipsSinhala: "තේරුනොනම් භාවිතා කරන්න." },
  { id: 31, kor: "좋은 하루 되세요", eng: "Have a nice day", sinhala: "සුබ දවසක් වේවා", grammar: "Polite well-wishing.", grammarSinhala: "ගෞරවාන්විත සුභ පැතුම්.", tips: "Use when parting.", tipsSinhala: "විභාග විමසීම් වැනි අවස්ථා වලදී භාවිතා කරන්න." },
  { id: 32, kor: "행복하세요", eng: "Be happy", sinhala: "සතුටින් සිටින්න", grammar: "Polite wish for happiness.", grammarSinhala: "ගෞරවාන්විතව සතුට පතනවා.", tips: "Use in greetings or farewells.", tipsSinhala: "ආයුබෝවන් හෝ ගුඩ්බායි කියා යන අවස්ථා වලදී භාවිතා කරන්න." },
  { id: 33, kor: "축하합니다", eng: "Congratulations", sinhala: "ඇරෝග්‍යාත්මක සුභ පැතුම්", grammar: "Formal congratulation.", grammarSinhala: "ගෞරවාන්විතව සුභ පැතුම් පවසන ආකාරය.", tips: "Use for achievements.", tipsSinhala: "සාර්ථකත්ව සඳහා භාවිතා කරන්න." },
  { id: 34, kor: "생일 축하합니다", eng: "Happy Birthday", sinhala: "උපන් දිනය සුභ පැතුම්", grammar: "Formal birthday greeting.", grammarSinhala: "ගෞරවාන්විත උපන් දිනයේ සුභ පැතුම්.", tips: "Use on birthdays.", tipsSinhala: "උපන් දිනයේදී භාවිතා කරන්න." },
  { id: 35, kor: "잘 자요", eng: "Sleep well", sinhala: "හොඳින් නිදාගන්න", grammar: "Informal good night.", grammarSinhala: "අවිධිගත සුභ රාත්‍රී පණිවුඩය.", tips: "Use with family or friends.", tipsSinhala: "පවුලේ හෝ මිතුරන් සමඟ භාවිතා කරන්න." },
  { id: 36, kor: "건강하세요", eng: "Stay healthy", sinhala: "සුවපත් වන්න", grammar: "Polite wish for health.", grammarSinhala: "ගෞරවාන්විත සුවපත් වීමේ සුභ පැතුම.", tips: "Use formally.", tipsSinhala: "ගෞරවාන්විත අවස්ථා වලදී භාවිතා කරන්න." },
  { id: 37, kor: "힘내세요", eng: "Cheer up / Stay strong", sinhala: "මනා ශක්තියක් ලබා ගන්න", grammar: "Polite encouragement.", grammarSinhala: "ගෞරවාන්විතව උත්තේජනාව.", tips: "Use when someone is sad.", tipsSinhala: "කෙනෙක් නිරාශා වූ විට භාවිතා කරන්න." },
  { id: 38, kor: "조심하세요", eng: "Be careful", sinhala: "සාවධානයෙන් සිටින්න", grammar: "Polite warning.", grammarSinhala: "ගෞරවාන්විත ඇඟවීම.", tips: "Use to warn politely.", tipsSinhala: "ගෞරවාන්විතව අනතුරකට හෝ අවදානමකට ඇඟවන්න." },
  { id: 39, kor: "환영합니다", eng: "Welcome", sinhala: "සාදරයෙන් පිළිගනිමු", grammar: "Polite greeting for guests.", grammarSinhala: "අමුත්තන්ට ගෞරවාන්විත ආදරයෙන් පිළිගැනීම.", tips: "Use in formal settings.", tipsSinhala: "ගෞරවාන්විත අවස්ථා වලදී භාවිතා කරන්න." },
  { id: 40, kor: "잘 됐어요", eng: "Good job / Well done", sinhala: "හොඳ වැඩක්", grammar: "Praise someone's achievement.", grammarSinhala: "කිසියම් සාර්ථකත්වයක් සඳහා ප්‍රශංසා කිරීම.", tips: "Use for accomplishments.", tipsSinhala: "සාර්ථකත්ව සඳහා භාවිතා කරන්න." },
  { id: 41, kor: "미안해요", eng: "Sorry (informal polite)", sinhala: "සමාවන්න", grammar: "Polite informal apology.", grammarSinhala: "ගෞරවාන්විත අවිධිගත සමාව ඉල්ලීම.", tips: "Use with peers politely.", tipsSinhala: "සහෘදයින් සමඟ ගෞරවාන්විතව භාවිතා කරන්න." },
  { id: 42, kor: "수고하세요", eng: "Keep up the good work", sinhala: "හොඳ වැඩ කරගෙන යන්න", grammar: "Polite encouragement for work.", grammarSinhala: "වැඩ සඳහා ගෞරවාන්විත උත්තේජනාව.", tips: "Use for coworkers.", tipsSinhala: "සේවකයින් හෝ මිතුරන් සමඟ භාවිතා කරන්න." },
  { id: 43, kor: "안심하세요", eng: "Don't worry", sinhala: "ඇදහිය නොකරන්න", grammar: "Reassuring someone politely.", grammarSinhala: "ගෞරවාන්විතව කෙනෙකුට ආතතියක් නොමැති බව කියා දීම.", tips: "Use to comfort.", tipsSinhala: "කෙනෙකු සැනසීමට භාවිතා කරන්න." },
  { id: 44, kor: "좋은 꿈 꾸세요", eng: "Sweet dreams", sinhala: "සුන්දර සිහිනයන්", grammar: "Polite night wish.", grammarSinhala: "ගෞරවාන්විත රාත්‍රී සුභ පැතුම.", tips: "Use before sleeping.", tipsSinhala: "නිදාගැනීමට පෙර භාවිතා කරන්න." },
  { id: 45, kor: "감사해요", eng: "Thank you (informal polite)", sinhala: "ස්තූතියි", grammar: "Informal polite thanks.", grammarSinhala: "ගෞරවාන්විත අවිධිගත ස්තූතියි.", tips: "Use with friends politely.", tipsSinhala: "සහෘදයින් සමඟ භාවිතා කරන්න." },
  { id: 46, kor: "환영해요", eng: "Welcome (informal)", sinhala: "සාදරයෙන් පිළිගනිමු", grammar: "Informal welcome.", grammarSinhala: "අවිධිගත ආදරයෙන් පිළිගැනීම.", tips: "Use with peers.", tipsSinhala: "සහෘදයින් සමඟ භාවිතා කරන්න." },
  { id: 47, kor: "즐거운 하루 보내세요", eng: "Have a fun day", sinhala: "රසවත් දවසක් වේවා", grammar: "Polite wish for a good day.", grammarSinhala: "ගෞරවාන්විතව සුභ දවසක් පතනවා.", tips: "Use in farewells.", tipsSinhala: "විභාග අවස්ථාවලදී භාවිතා කරන්න." },
  { id: 48, kor: "행운을 빕니다", eng: "Good luck", sinhala: "භාග්‍යය අයත් වේවා", grammar: "Formal luck wish.", grammarSinhala: "ගෞරවාන්විත වාසනාව පතනවා.", tips: "Use in exams or challenges.", tipsSinhala: "විභාග හෝ අභියෝග අවස්ථාවලදී භාවිතා කරන්න." },
  { id: 49, kor: "곧 봐요", eng: "See you soon", sinhala: "ඉක්මනින් හමුවෙමු", grammar: "Informal farewell.", grammarSinhala: "අවිධිගත පිටත් වීමේ සුබ පැතුම.", tips: "Use with friends or peers.", tipsSinhala: "මිතුරන් හෝ සමඟින් භාවිතා කරන්න." },
  { id: 50, kor: "잘 가요", eng: "Goodbye (informal)", sinhala: "සුභ ගමන්", grammar: "Informal farewell.", grammarSinhala: "අවිධිගත පිටත් වීමේ ආකාරය.", tips: "Use casually with friends.", tipsSinhala: "සහෘදයින් සමඟ භාවිතා කරන්න." },
];

export default vocabulary;
