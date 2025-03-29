// import { View, Text, StyleSheet } from "react-native";
// import React from "react";

// const home = () => {
//   return (
//     <View>
//       <Text>home</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   link: {
//     marginTop: 15,
//     paddingVertical: 15,
//   },
// });

// export default home;

import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { WebView } from "react-native-webview";
import { Link } from "expo-router";
import { Button } from "react-native";

export default function home() {
  return (
    <>
      <WebView
        source={{
          uri: "http://192.168.5.148:8080/flow.xml",
        }}
        style={{ flex: 1 }}
        onLoad={() => console.log("WebView Loaded!")}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
      />
      {/* <Image source={require("D:/PBL5/my-app1/img/flow2.png")} /> */}
    </>
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
