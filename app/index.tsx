import { Link } from "expo-router";
import { Text, View, Image, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Statusbar></Statusbar> */}
        <Text>Edit app/index.tsx to edit this screen.</Text>

        <Text>Open up app/index.tsx to start working on your app!</Text>

        <Link href="/home" style={styles.link}>
          Home
        </Link>

        <Link href="/login" style={styles.link}>
          Login
        </Link>

        <Link href="/register" style={styles.link}>
          Register
        </Link>

        <Link href="/documents" style={styles.link}>
          Documents
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
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
