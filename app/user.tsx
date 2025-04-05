import { View } from "react-native";
import React from "react";
import UserHead from "@/components/User/UserHead";
import UserSetting from "@/components/User/UserSetting";
import UserChange from "@/components/User/UserChange";

const UserProfile = () => {
  return (
    <View style={{ flex: 1 }}>
      <UserHead />
      <View style={styles.separator} /> {/* Đường kẻ */}
      <UserSetting />
      <View style={styles.separator} /> {/* Đường kẻ */}
      <UserChange />
    </View>
  );
};

const styles = {
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 10, // Khoảng cách trên dưới đường kẻ
    width: "90%",
    alignSelf: "center",
  },
};

export default UserProfile;
