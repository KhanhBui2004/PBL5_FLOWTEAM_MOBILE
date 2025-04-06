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
import { getUser } from "@/services/AuthService";
import { UserContext } from "D:/PBL5/PBL5_FLOW_TEAMS_MOBILE/context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Userchange = () => {
  const [user, setUser] = useState(null);
  // const { userId } = useContext(UserContext);

  // useEffect(() => {
  //   if (userId) {
  //     fetchUser(userId);
  //   }
  // }, [userId]);

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
  return (
    <View style={styles.container}>
      <ScrollView style={tw`z-0`} contentContainerStyle={{ flexGrow: 1 }}>
        {/* information */}
        <View>
          <Text style={styles.headText}>Account settings</Text>
          {user && (
            <>
              <Text style={styles.text}>Username</Text>
              <TextInput style={styles.inputText} value={user.name} />
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.inputText}
                value={user.email}
                keyboardType="email-address"
              />
              <Text style={styles.text}>Current password</Text>
              <TextInput
                style={styles.inputText}
                value={user.password}
                secureTextEntry
              />
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
          <TextInput style={styles.inputText} secureTextEntry />
          <Text style={styles.text}>New password</Text>
          <TextInput style={styles.inputText} secureTextEntry />
          <Text style={styles.text}>Repeat new password</Text>
          <TextInput style={styles.inputText} secureTextEntry />
        </View>
        <View style={styles.separator} /> {/* Đường kẻ */}
        <View>
          <Text style={styles.headText}>Delete account</Text>
          <View>
            <Text style={{ fontSize: 18, padding: 5 }}>
              If you delete your Lucid account, your data will be gone forever.
            </Text>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              onPress={DeleteAcc}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "red",
                  padding: 5,
                  fontWeight: "bold",
                }}
              >
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
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
