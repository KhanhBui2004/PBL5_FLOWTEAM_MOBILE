import React from "react";
import { View, Text } from "react-native";

const renderTree = (data, level = 0) => {
  if (typeof data === "string" || typeof data === "number") {
    return <Text style={{ marginLeft: level * 10 }}>{data}</Text>;
  }

  return Object.entries(data).map(([key, value], index) => (
    <View key={index} style={{ marginLeft: level * 10 }}>
      <Text style={{ fontWeight: "bold" }}>{key}:</Text>
      {Array.isArray(value)
        ? value.map((item, i) => (
            <View key={i}>{renderTree(item, level + 1)}</View>
          ))
        : renderTree(value, level + 1)}
    </View>
  ));
};

export default function XmlTreeViewer({ xmlJson }) {
  return <View style={{ padding: 10 }}>{renderTree(xmlJson)}</View>;
}
