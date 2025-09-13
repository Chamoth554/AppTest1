// screens/SplashScreen.tsx
// (content omitted for brevity, already provided above)
// screens/SplashScreen.tsx
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface Props { onFinish: () => void; }

export default function SplashScreen({ onFinish }: Props) {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 1800, useNativeDriver: true }).start();
    const t = setTimeout(onFinish, 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fade }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>🇰🇷</Text>
        </View>
        <Text style={styles.appName}>Korean Prep Sri Lanka</Text>
        <Text style={styles.tagline}>Learn Korean for jobs in Korea</Text>
        <View style={styles.koreanFlag}>
          <Text style={styles.flagEmoji}>태극기</Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  content: { alignItems: "center" },
  logoContainer: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center", alignItems: "center", marginBottom: 20,
  },
  logoEmoji: { fontSize: 60 },
  appName: { fontSize: 28, fontWeight: "bold", color: "white", marginBottom: 8 },
  tagline: { fontSize: 16, color: "rgba(255,255,255,0.9)" },
  koreanFlag: { position: "absolute", top: -100, right: -50, opacity: 0.3 },
  flagEmoji: { fontSize: 40, color: "white" },
});
