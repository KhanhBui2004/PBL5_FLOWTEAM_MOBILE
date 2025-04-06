import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Feather";
// import { UserContext } from "D:/PBL5/PBL5_FLOW_TEAMS_MOBILE/context/UserContext";
import { getUser } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const getId = async () => {
    try {
      const Id = await AsyncStorage.getItem("userId");
      return Id;
    } catch (e) {
      console.error("Lỗi khi lấy Id:", e);
      return null;
    }
  };

  const fetchData = async () => {
    const Id = await getId();
    const result = await getUser(Id); // thay bằng id thực tế
    if (result.success) {
      setUser(result.user);
    } else {
      console.log("Lỗi:", result.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (response) => {
      if (response.assets && response.assets[0].uri) {
        setAvatar(response.assets[0].uri); // Lưu URL ảnh
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={handleFileChange}>
        {user && user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>US</Text>
        )}

        {/* Lớp phủ khi hover trên web (không hỗ trợ trên React Native, thay bằng TouchableOpacity) */}
        <TouchableOpacity style={styles.overlay}>
          <Icon name="camera" size={27} color="#fff" style={styles.icon} />
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
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
    backgroundColor: "#76ed84", // Màu nền xanh
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 120,
    height: 120,
    overflow: "hidden",
    position: "relative",
    marginLeft: 20,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "cover",
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
function fetchUser(userId: any) {
  throw new Error("Function not implemented.");
}
