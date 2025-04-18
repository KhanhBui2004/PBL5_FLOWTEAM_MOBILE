import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [url, setUrl] = useState("");
  const webviewRef = useRef(null);
  const { projectId } = useLocalSearchParams();

  const getId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      return id;
    } catch (e) {
      console.error("Lỗi khi lấy token:", e);
      return null;
    }
  };

  useEffect(() => {
    if (projectId) {
      setUrl(`http://192.168.111.59:5173/flow/${projectId}`);
    }
  }, [projectId]);

  useEffect(() => {
    console.log("URL mới được cập nhật:", url);
  }, [url]);

  const setLocalStorageValue = async () => {
    const Id = await getId();
    const jsCode = `
      (function() {
      const idValue = "${Id}";
        localStorage.setItem("id", idValue);
        window.ReactNativeWebView.postMessage("Đã lưu id: " + idValue);
      })();
      true;
    `;
    webviewRef.current.injectJavaScript(jsCode);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]}
        onMessage={(event) => {
          const valueFromLocalStorage = event.nativeEvent.data;
          console.log("Dữ liệu từ localStorage:", valueFromLocalStorage);
        }}
        onLoadEnd={setLocalStorageValue}
      />
    </View>
  );
};

export default index;
