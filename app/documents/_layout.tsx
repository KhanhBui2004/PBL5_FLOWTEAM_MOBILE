import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" options={{ title: "Trang index" }} /> */}
      {/* <Stack.Screen
        name="index"
        options={{ title: "Trang chủ", headerShown: false }}
      /> */}
      <Stack.Screen
        name="MyDocuments"
        options={{ title: "My Documents", headerShown: false }}
      />
      <Stack.Screen
        name="Trash"
        options={{ title: "Thùng rác", headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        options={{ title: "Cài đặt", headerShown: false }}
      />
      <Stack.Screen name="user" options={{ title: "Profile" }} />
    </Stack>
  );
}
