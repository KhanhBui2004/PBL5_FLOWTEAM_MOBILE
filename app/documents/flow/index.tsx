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
      setUrl(`http://10.10.2.193:5173/flow/${projectId}`);
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

    // setTimeout(getLocalStorageValue, 2000);
  };

  // const getLocalStorageValue = () => {
  //   const jsCode = `
  //     (function() {
  //       const value = localStorage.getItem("id");
  //       window.ReactNativeWebView.postMessage("Giá trị hiện tại trong localStorage: " + value);
  //     })();
  //     true;
  //   `;
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

// import React, { useRef } from "react";
// import { View } from "react-native";
// import WebView from "react-native-webview";

// export default function WebViewWithLogs() {
//   const webviewRef = useRef(null);

//   const injectedJS = `
//     (function() {
//       // Gửi console.log
//       const originalLog = console.log;
//       console.log = function(...args) {
//         window.ReactNativeWebView?.postMessage("[LOG] " + args.join(" "));
//         originalLog.apply(console, args);
//       };

//       // Gửi console.error
//       const originalError = console.error;
//       console.error = function(...args) {
//         window.ReactNativeWebView?.postMessage("[ERROR] " + args.join(" "));
//         originalError.apply(console, args);
//       };

//       // Bắt lỗi JavaScript
//       window.onerror = function(message, source, lineno, colno, error) {
//         window.ReactNativeWebView?.postMessage(
//           "[ONERROR] " + message + " at " + source + ":" + lineno + ":" + colno
//         );
//       };

//       // Bắt lỗi Promise không xử lý
//       window.addEventListener("unhandledrejection", function(event) {
//         window.ReactNativeWebView?.postMessage("[PROMISE] " + event.reason);
//       });
//     })();
//     true;
//   `;

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         ref={webviewRef}
//         source={{
//           uri: "http://192.168.111.59:5173/flow/67f0c96569b5ea5123a49b68",
//         }} // đổi thành URL của bạn
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         originWhitelist={["*"]}
//         injectedJavaScriptBeforeContentLoaded={injectedJS}
//         onMessage={(event) => {
//           console.log("📦 WebView:", event.nativeEvent.data);
//         }}
//       />
//     </View>
//   );
// }
