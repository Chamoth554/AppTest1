// screens/WordDetailScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import vocabulary from "./data/vocabulary";
import { useTheme } from "./ThemeContext";

interface Props {
    navigate: (s: ScreenName, params?: any) => void;
    route: { params: { id: number } };
}

export default function WordDetailScreen({ navigate, route }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const wordIndex = vocabulary.findIndex((v) => v.id === route.params.id);
    const word = vocabulary[wordIndex];

    const goPrev = () => {
        if (wordIndex > 0) navigate("word-detail", { id: vocabulary[wordIndex - 1].id });
    };
    const goNext = () => {
        if (wordIndex < vocabulary.length - 1) navigate("word-detail", { id: vocabulary[wordIndex + 1].id });
    };

    return (
        <ScrollView
            style={[styles.container, isDark && styles.containerDark]}
            contentContainerStyle={{ paddingBottom: 50 }}
        >
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate("word-list")}>
                    <Ionicons name="chevron-back" size={22} color={isDark ? "#fff" : "#333"} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}></Text>
            </View>
            {/* Vocabulary Card */}
            <View style={[styles.wordBox, isDark && styles.wordBoxDark]}>
                <Text style={[styles.kor, isDark && styles.korDark]}>{word.kor}</Text>
                <Text style={[styles.eng, isDark && styles.engDark]}>{word.eng}</Text>
                <Text style={[styles.sinhala, isDark && styles.sinhalaDark]}>{word.sinhala}</Text>
                <TouchableOpacity style={[styles.audioBtn, isDark && styles.audioBtnDark]}>
                    <Ionicons name="play" size={22} color="#667eea" />
                </TouchableOpacity>
            </View>

            {/* Navigation Buttons */}
            <View style={styles.navContainer}>
                <TouchableOpacity
                    style={[styles.navBtn, wordIndex === 0 && styles.navBtnDisabled]}
                    onPress={goPrev}
                    disabled={wordIndex === 0}
                >
                    <Ionicons name="chevron-back" size={20} color="white" />
                    <Text style={styles.navText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navBtn, wordIndex === vocabulary.length - 1 && styles.navBtnDisabled]}
                    onPress={goNext}
                    disabled={wordIndex === vocabulary.length - 1}
                >
                    <Text style={styles.navText}>Next</Text>
                    <Ionicons name="chevron-forward" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Grammar Notes */}
            {word.grammar && (
                <View style={[styles.card, isDark && styles.cardDark]}>
                    <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Grammar Notes</Text>
                    <Text style={[styles.cardText, isDark && styles.cardTextDark]}>
                        • {word.grammar}{"\n"}
                        <Text style={{ fontWeight: "700" }}>{word.grammarSinhala}</Text>
                    </Text>
                </View>
            )}

            {/* Cultural Tips */}
            {word.tips && (
                <View style={[styles.card, isDark && styles.cardDark]}>
                    <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Cultural Tips</Text>
                    <Text style={[styles.cardText, isDark && styles.cardTextDark]}>
                        • {word.tips}{"\n"}
                        <Text style={{ fontWeight: "700" }}>{word.tipsSinhala}</Text>
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    containerDark: { backgroundColor: "#121212" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginLeft: 12,
        color: "#333",
    },
    headerTitleDark: { color: "#fff" },

    wordBox: {
        padding: 25,
        borderRadius: 16,
        backgroundColor: "#f8f9fa",
        alignItems: "center",
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        position: "relative",
    },
    wordBoxDark: { backgroundColor: "#1E1E1E" },

    kor: { fontSize: 32, fontWeight: "700", color: "#333", marginBottom: 10 },
    korDark: { color: "#fff" },

    eng: { fontSize: 18, color: "#666", marginBottom: 6 },
    engDark: { color: "#ccc" },

    sinhala: { fontSize: 16, color: "#999" },
    sinhalaDark: { color: "#aaa" },

    audioBtn: {
        position: "absolute",
        right: 20,
        top: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 30,
        elevation: 3,
    },
    audioBtnDark: { backgroundColor: "#333" },

    navContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    navBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#667eea",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 22,
    },
    navBtnDisabled: { backgroundColor: "#999" },
    navText: { color: "white", marginHorizontal: 6, fontWeight: "600" },

    card: {
        backgroundColor: "#f8f9fa",
        padding: 18,
        borderRadius: 14,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardDark: { backgroundColor: "#1E1E1E" },
    cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#333" },
    cardTitleDark: { color: "#fff" },
    cardText: { fontSize: 14, color: "#666", lineHeight: 22, textAlign: "left" },
    cardTextDark: { color: "#ccc" },
});
