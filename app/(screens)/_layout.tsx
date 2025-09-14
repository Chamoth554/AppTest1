
import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // show header
        headerStyle: { backgroundColor: "#fff" }, // optional: white background
        headerTintColor: "#000", // optional: text color
        headerTitleAlign: "center", // optional: center title
      }}
    >
      <Stack.Screen name="App" />
    </Stack>
  );
}
