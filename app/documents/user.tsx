import { View } from "react-native";
import React from "react";
import UserHead from "@/components/Documents/User/UserHead";
import UserSetting from "@/components/Documents/User/UserSetting";
import UserChange from "@/components/Documents/User/UserChange";
import tw from "tailwind-react-native-classnames";
import DocNavbar from "@/components/Documents/DocNavbar";

const UserProfile = () => {
  return (
    <View style={{ flex: 1 }}>
      <UserHead />
      <View style={styles.separator} /> {/* Đường kẻ */}
      <UserSetting />
      <View style={styles.separator} /> {/* Đường kẻ */}
      <UserChange />
    </View>
    // <View style={{ flex: 1 }}>
    //   <View style={tw`bg-gray-100 min-h-full`}>
    //     <View style={tw`z-10`}>
    //       <DocNavbar />
    //     </View>
    //     <View style={{ flex: 1 }}>
    //       <UserHead />
    //       <View style={styles.separator} /> {/* Đường kẻ */}
    //       <UserSetting />
    //       <View style={styles.separator} /> {/* Đường kẻ */}
    //       <UserChange />
    //     </View>
    //   </View>
    // </View>
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
