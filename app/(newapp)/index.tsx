//import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NewAppScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the New App Section!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(screens)/App")}
        //onPress={() => router.push("/(newapp)/exam")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White background
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
