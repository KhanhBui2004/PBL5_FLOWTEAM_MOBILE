import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { changePasswordAPI, getUser } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSetting from "./UserSetting";

const Userchange = ({ onSendData }) => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const getId = async () => {
    try {
      const Id = await AsyncStorage.getItem("userId");
      return Id;
    } catch (e) {
      console.error("Lỗi khi lấy Id:", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const Id = await getId();
      const result = await getUser(Id); // thay bằng id thực tế
      if (result.success) {
        setUser(result.user);
      } else {
        console.log("Lỗi:", result.error);
      }
    };

    fetchData();
  }, []);

  const DeleteAcc = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc chắn muốn xóa tài khoản của mình không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () =>
            Alert.alert("Thông báo", "Tài khoản của bạn đã bị xóa!"),
        },
      ]
    );
  };

  useEffect(() => {
    onSendData(user);
  }, [user]);

  const changePassword = async () => {
    if (oldPassword === "" || password === "") {
      // Kiểm tra nếu trường mật khẩu cũ hoặc mới trống
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (oldPassword === password) {
      // Kiểm tra nếu mật khẩu cũ và mới giống nhau
      Alert.alert("Thông báo", "Mật khẩu mới không được giống mật khẩu cũ!");
      return;
    }
    // Gọi API để thay đổi mật khẩu ở đây
    const response = await changePasswordAPI(user._id, {
      oldPassword: oldPassword,
      newPassword: password,
    });
    if (response.success) {
      Alert.alert("Thông báo", "Đổi mật khẩu thành công!");
      console.log("Đổi mật khẩu thành công!");
      setOldPassword(""); // Reset trường mật khẩu cũ
      setPassword(""); // Reset trường mật khẩu cũ
    } else {
      Alert.alert("Thông báo", "Đổi mật khẩu thất bại!");
      console.log("Đổi mật khẩu thất bại!");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={tw`z-0`} contentContainerStyle={{ flexGrow: 1 }}>
        {/* information */}
        <View>
          <Text style={styles.headText}>Account settings</Text>
          {user && (
            <>
              <Text style={styles.text}>Username</Text>
              <TextInput
                style={styles.inputText}
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.nativeEvent.text });
                }}
              />
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.inputText}
                value={user.email}
                keyboardType="email-address"
              />
              {/* <Text style={styles.text}>Current password</Text>
              <TextInput
                style={styles.inputText}
                value={user.password}
                secureTextEntry
              /> */}
            </>
          )}
        </View>
        <View style={styles.separator} /> {/* Đường kẻ */}
        <View>
          <View style={styles.headPw}>
            <Text style={styles.headText}>Change password</Text>
            <TouchableOpacity>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#2978d9" }}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Current password</Text>
          <TextInput
            style={styles.inputText}
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.nativeEvent.text);
            }}
          />
          <Text style={styles.text}>New password</Text>
          <TextInput
            style={styles.inputText}
            value={password}
            onChange={(e) => {
              setPassword(e.nativeEvent.text);
            }}
          />
          {/* <Text style={styles.text}>Repeat new password</Text>
          <TextInput style={styles.inputText} secureTextEntry /> */}
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
            onPress={changePassword}
          >
            <Text style={{ fontSize: 17, color: "white" }}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputText: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    padding: 5,
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: "#262626",
    marginVertical: 15, // Khoảng cách trên dưới đường kẻ
    width: "80%",
    alignSelf: "center",
  },
  headPw: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Userchange;
function fetchUser(userId: any) {
  throw new Error("Function not implemented.");
}
