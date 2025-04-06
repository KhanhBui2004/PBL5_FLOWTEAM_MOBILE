import { View, Text, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { updateUser } from "@/services/AuthService";

const UserSetting = ({ user }) => {
  const updateInfor = async () => {
    const response = await updateUser(user._id, user);
    if (response.success) {
      console.log("Cập nhật thành công!");
    } else {
      console.log("Cập nhật thất bại!");
    }
  };

  return (
    <View style={{ marginLeft: 20 }}>
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>User Setting</Text>
      <View style={{}}>
        <Text style={{ fontSize: 16 }}>
          Any changes you make will apply to your Lucidchart, Lucidspark and
          Lucidscale accounts.
        </Text>
        <TouchableOpacity
          style={{
            borderColor: "black",
            backgroundColor: "blue",
            borderRadius: 10,
            padding: 10,
            marginRight: 30,
            marginTop: 10,
            maxWidth: 160,
            alignSelf: "flex-end",
            flexDirection: "row",
            justifyContent: "center",
          }}
          onPress={updateInfor}
        >
          <Text style={{ fontSize: 17, color: "white" }}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserSetting;
