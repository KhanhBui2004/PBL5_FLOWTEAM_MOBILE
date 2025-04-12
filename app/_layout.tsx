import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        options={{ title: "Trang chủ", headerShown: false }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Đăng nhập", headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ title: "Đăng kí", headerShown: false }}
      />
      <Stack.Screen
        name="documents"
        options={{ title: "Documents", headerShown: false }}
      />
    </Stack>
  );
}
