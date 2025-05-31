import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { getUser, uploadImage } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { IP } from "@/config";

const User = ({ onSendData, user }) => {
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const pickImage = async () => {
    try {
      // Yêu cầu quyền truy cập ảnh
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permission Denied", "Bạn cần cấp quyền truy cập ảnh");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const image = result.assets[0]; // image.uri, image.fileName, etc.
        const response = await uploadImage(image); // gọi hàm upload
        if (response) {
          const updatedUser = {
            ...localUser,
            avatar: response.file.filename, // ⚠️ tuỳ vào response từ server
          };

          setLocalUser(updatedUser); // 👈 cập nhật để giao diện render lại
          onSendData(updatedUser); // 👈 gửi lên component cha
        }
      }
    } catch (error) {
      console.error("Lỗi khi chọn ảnh:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
        {localUser && localUser.avatar ? (
          <Image
            source={{
              uri: `${IP}:8000/imgs/avatars/` + localUser.avatar,
            }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.avatarText}>US</Text>
        )}

        {/* Lớp phủ khi hover trên web (không hỗ trợ trên React Native, thay bằng TouchableOpacity) */}
        <View style={styles.overlay}>
          <Icon name="camera" size={27} color="#fff" style={styles.icon} />
          <Text style={styles.uploadText}>Upload</Text>
        </View>
      </TouchableOpacity>
      {user ? (
        <View style={{ margin: 20, width: 250 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>{user.name}</Text>
          <Text style={{ fontSize: 15 }}>{user.email}</Text>
        </View>
      ) : (
        <View style={{ margin: 20, width: 250 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>User</Text>
          <Text style={{ fontSize: 15 }}>example@gmail.com</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 150,
    backgroundColor: "#e3e3e3",
    alignSelf: "center",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    overflow: "hidden", // 👈 rất quan trọng để bo góc ảnh bên trong
    backgroundColor: "#eee",
  },
  avatar: {
    width: "100%",
    height: "100%",
    // borderRadius: 50,
    // backgroundColor: "transparent",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  },
  overlayHovered: {
    opacity: 1,
  },
  icon: {
    marginBottom: 5,
  },
  uploadText: {
    color: "#000000",
    fontSize: 17,
  },
});

export default User;
