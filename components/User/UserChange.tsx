import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";

const Userchange = () => {
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
        <View>
          <Text style={styles.headText}>Profile settings</Text>
          <Text style={styles.text}>First Name</Text>
          <TextInput style={styles.inputText} value="Khoi" />
          <Text style={styles.text}>Last Name</Text>
          <TextInput style={styles.inputText} value="Khoi" />
        </View>
        <View style={styles.separator} /> {/* Đường kẻ */}
        <View>
          <Text style={styles.headText}>Account settings</Text>
          <Text style={styles.text}>Username</Text>
          <TextInput style={styles.inputText} value="Khoi" />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.inputText}
            value="Khoi"
            keyboardType="email-address"
          />
          <Text style={styles.text}>Current password</Text>
          <TextInput style={styles.inputText} value="Khoi" secureTextEntry />
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
          <TextInput style={styles.inputText} value="Khoi" secureTextEntry />
          <Text style={styles.text}>New password</Text>
          <TextInput style={styles.inputText} value="Khoi" secureTextEntry />
          <Text style={styles.text}>Repeat new password</Text>
          <TextInput style={styles.inputText} value="Khoi" secureTextEntry />
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
