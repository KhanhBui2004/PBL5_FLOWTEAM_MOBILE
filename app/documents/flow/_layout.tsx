import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ title: "Flow", headerShown: false }}
      />
      <Stack.Screen
        name="newflow"
        options={{ title: "New Flow", headerShown: false }}
      />
      <Stack.Screen
        name="newflowAI"
        options={{ title: "New flow with AI", headerShown: false }}
      />
    </Stack>
  );
}
