import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trang chủ" }} />
      <Stack.Screen name="login" options={{ title: "Đăng nhập" }} />
      <Stack.Screen name="register" options={{ title: "Đăng kí" }} />
    </Stack>
  );
}
