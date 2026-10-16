
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="student-details" />
      <Stack.Screen name="select-class" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="classes" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="rewards" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="assignments" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="parent-controls"/>
    </Stack>
  );
}