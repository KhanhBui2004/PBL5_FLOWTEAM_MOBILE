import { UserProvider } from "@/context/UserContext";
import { Link, Redirect, router } from "expo-router";
import { Text, View, Image, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import HomePage from "./home";
import { useEffect } from "react";

export default function Index() {
  return <Redirect href="/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
