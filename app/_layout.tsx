import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import HomePage from "./home";
import LoginPage from "./login";
import DocumentsPage from "./document";
import { UserContext } from "../context/UserContext";

export default function RootLayout() {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
  }, [token]);

  const logout = async () => {
    try {
      console.log("Logout function calling...");
      await AsyncStorage.removeItem("userToken");
      console.log("Logout function called");
      router.push("/login");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };
  return (
    <UserContext.Provider value={{ token, logout }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="index" options={{ title: "Trang index" }} /> */}

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
        {/* <Stack.Screen name="user" options={{ title: "Profile" }} /> */}
      </Stack>
    </UserContext.Provider>
  );
}
