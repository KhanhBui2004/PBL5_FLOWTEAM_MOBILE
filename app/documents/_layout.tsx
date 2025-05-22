import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ title: "Trang chủ", headerShown: false }}
      />
      <Stack.Screen
        name="mydocuments"
        options={{ title: "My Documents", headerShown: false }}
      />
      <Stack.Screen
        name="trash"
        options={{ title: "Thùng rác", headerShown: false }}
      />
      {/* <Stack.Screen
        name="setting"
        options={{ title: "Cài đặt", headerShown: false }}
      /> */}
      <Stack.Screen name="user" options={{ title: "Profile" }} />
      <Stack.Screen name="flow" options={{ title: "Flow" }} />
    </Stack>
  );
}
