// app/index.tsx (Simple redirect to your App component)
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    router.replace('/(screens)/App');
  }, []);

  return null;
}

// Then update your app/(screens)/_layout.tsx to only include App:
// import { Stack } from "expo-router";

// export default function ScreensLayout() {
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         headerStyle: { backgroundColor: "#fff" },
//         headerTintColor: "#000",
//         headerTitleAlign: "center",
//       }}
//     >
//       <Stack.Screen name="App" />
//     </Stack>
//   );
// }