import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f9fa',
          },
          headerTintColor: '#2d3436',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Welcome',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Login',
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            title: 'Sign Up',
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="about" 
          options={{ 
            title: 'About',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="dashboard" 
          options={{ 
            title: 'Dashboard',
            headerShown: false,
          }} 
        />
      </Stack>
    </>
  );
}