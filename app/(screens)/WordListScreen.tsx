// screens/WordListScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import type { ScreenName } from "./App";
import vocabulary from "./data/vocabulary";
import { useTheme } from "./ThemeContext";
interface Props { navigate: (s: ScreenName, params?: any) => void; }

export default function WordListScreen({ navigate }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [searchText, setSearchText] = useState("");

    const filteredWords = vocabulary.filter(
        (v) =>
            v.kor.includes(searchText) ||
            v.eng.toLowerCase().includes(searchText.toLowerCase()) ||
            v.sinhala.includes(searchText)
    );

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            {/* Header */}
            <TouchableOpacity onPress={() => navigate("lesson-detail")}>
                <Ionicons name="chevron-back" size={22} color={isDark ? "#fff" : "#333"} />
            </TouchableOpacity>
            <Text style={[styles.header, isDark && styles.headerDark]}>Word List</Text>

            {/* Search Bar */}
            <TextInput
                placeholder="Search..."
                placeholderTextColor={isDark ? "#888" : "#aaa"}
                style={[styles.search, isDark && styles.searchDark]}
                value={searchText}
                onChangeText={setSearchText}
            />

<FlatList
    data={filteredWords}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item, index }) => (
        <TouchableOpacity
            style={[styles.card, isDark && styles.cardDark]}
            onPress={() => navigate("word-detail", { id: item.id })}
            activeOpacity={0.8}
        >
            {/* Show index + 1 as serial number */}
            <Text style={[styles.serial, isDark && styles.serialDark]}>{index + 1}.</Text>
            
            <Text style={[styles.kor, isDark && styles.korDark]}>{item.kor}</Text>
            <Text style={[styles.eng, isDark && styles.engDark]}>{item.eng}</Text>
            <Text style={[styles.sinhala, isDark && styles.sinhalaDark]}>{item.sinhala}</Text>
        </TouchableOpacity>
    )}
    contentContainerStyle={{ paddingBottom: 30 }}
/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    containerDark: { backgroundColor: "#121212" },

    header: { fontSize: 24, fontWeight: "700", marginBottom: 12, color: "#333" },
    headerDark: { color: "#fff" },

    search: {
        padding: 10,
        borderRadius: 12,
        backgroundColor: "#f1f1f1",
        marginBottom: 16,
        color: "#333",
    },
    searchDark: { backgroundColor: "#1E1E1E", color: "#fff" },

    card: {
        padding: 18,
        borderRadius: 14,
        backgroundColor: "#f8f9fa",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardDark: { backgroundColor: "#1E1E1E" },

    kor: { fontSize: 18, fontWeight: "700", color: "#333" },
    korDark: { color: "#fff" },
    eng: { fontSize: 14, color: "#666", marginTop: 2 },
    engDark: { color: "#ccc" },
    sinhala: { fontSize: 14, color: "#999", marginTop: 2 },
    sinhalaDark: { color: "#aaa" },
    serial: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    serialDark: {
        color: "#fff",
    },
    
});
