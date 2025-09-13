// app/(newapp)/_layout.tsx
import { Stack } from "expo-router";

export default function NewAppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
