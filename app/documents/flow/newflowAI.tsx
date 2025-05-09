import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IP } from "@/config";
import WebView from "react-native-webview";

const newflowAI = () => {
  // const [url, setUrl] = useState("");
  const url = `${IP}:5173/flow-with-ai`;
  const webviewRef = useRef(null);
  // const { projectId } = useLocalSearchParams();

  const getId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      return id;
    } catch (e) {
      console.error("Lỗi khi lấy token:", e);
      return null;
    }
  };

  // useEffect(() => {
  //   if (projectId) {
  //     setUrl(`${IP}:5173/flow/${projectId}`);
  //   }
  // }, [projectId]);

  // useEffect(() => {
  //   console.log("URL mới được cập nhật:", url);
  // }, [url]);

  // const setLocalStorageValue = async () => {
  //   const Id = await getId();
  //   const jsCode = `
  //       (function() {
  //       const idValue = "${Id}";
  //         localStorage.setItem("id", idValue);
  //         window.ReactNativeWebView.postMessage("Đã lưu id: " + idValue);
  //       })();
  //       true;
  //     `;
  //   webviewRef.current.injectJavaScript(jsCode);
  // };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        androidHardwareAccelerationDisabled={false}
        onMessage={(event) => {
          const valueFromLocalStorage = event.nativeEvent.data;
          console.log("Dữ liệu từ localStorage:", valueFromLocalStorage);
        }}
        // onLoadEnd={setLocalStorageValue}
        //       injectedJavaScript={`
        //         (function() {
        //   try {
        //     // Bắt lỗi console.error
        //     const originalConsoleError = console.error;
        //     console.error = function(...args) {
        //       window.ReactNativeWebView.postMessage("🚨 console.error: " + JSON.stringify(args));
        //       originalConsoleError.apply(console, args);
        //     };

        //     // Bắt lỗi window.onerror
        //     window.onerror = function(message, source, lineno, colno, error) {
        //       const errorMsg = "🔥 window.onerror: " + message + " at " + source + ":" + lineno + ":" + colno;
        //       window.ReactNativeWebView.postMessage(errorMsg);
        //     };

        //     // Bắt lỗi Promise unhandled
        //     window.onunhandledrejection = function(event) {
        //       window.ReactNativeWebView.postMessage("⚠️ Unhandled promise rejection: " + event.reason);
        //     };

        //     console.log("✅ FE error listeners injected");

        //   } catch (err) {
        //     window.ReactNativeWebView.postMessage("❌ Lỗi khi inject error listeners: " + err.message);
        //   }
        // })();
        //         true;
        //       `}
      />
    </View>
  );
};

export default newflowAI;
