import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { useUser } from "@/context/UserContext";

export default function DocNavbar() {
  const { token, logout } = useUser();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Header */}
      <View style={tw`flex flex-row items-center bg-white shadow px-6 py-3`}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Image
            source={require("../../assets/images/FlowTeam.png")}
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={tw`flex-1 flex-row justify-end items-center relative`}>
          {/* Nút Hamburger */}
          <TouchableOpacity
            style={tw`px-4 py-2`}
            onPress={() => setIsMenuVisible(!isMenuVisible)}
          >
            <FontAwesome name="bars" size={24} color="#000" />
          </TouchableOpacity>

          {/* Danh sách menu */}
          {isMenuVisible && (
            <View
              style={tw`absolute top-12 right-4 bg-white shadow-lg rounded-lg p-3`}
            >
              {/* Button mở modal */}
              <TouchableOpacity
                style={tw`flex flex-row items-center py-2 border-b border-gray-300`}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome name="plus-square" size={15} color="#000" />
                <Text style={tw`text-gray-800 mx-2`}>New Flow</Text>
              </TouchableOpacity>
              {/* Modal */}
              <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
              >
                <View
                  style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
                >
                  <View style={tw`bg-white p-6 rounded-xl w-72`}>
                    <View style={tw`items-center`}>
                      <Text style={tw`text-lg font-bold mb-4`}>
                        Create Flow
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={tw`py-2`}
                      onPress={() => {
                        router.push("/documents/flow/newflow");
                        setModalVisible(false);
                      }}
                    >
                      <Text style={tw`text-base text-blue-600`}>New Flow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={tw`py-2`}
                      onPress={() => {
                        router.push("/documents/flow/newflowAI");
                        setModalVisible(false);
                      }}
                    >
                      <Text style={tw`text-base text-blue-600`}>
                        New Flow With AI
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={tw`mt-4`}
                    >
                      <Text style={tw`text-center text-red-500`}>Đóng</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={tw`flex flex-row justify-first items-center py-2 border-b border-gray-300`}
                onPress={() => router.push("/documents/mydocuments")}
              >
                <FontAwesome name="folder" size={15} color="#000" />
                <Text style={tw`text-gray-800 mx-2`}>My Documents</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex flex-row justify-first items-center py-2 border-b border-gray-300`}
                onPress={() => router.push("/documents/trash")}
              >
                <FontAwesome name="trash" size={15} color="#000" />
                <Text style={tw`text-gray-800 mx-2`}>Trash</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex flex-row justify-first items-center py-2 border-b border-gray-300`}
                onPress={() => router.push("/documents/user")}
              >
                <FontAwesome name="user" size={15} color="#000" />
                <Text style={tw`text-gray-800 mx-2`}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex flex-row justify-first items-center py-2 border-b border-gray-300`}
              >
                <FontAwesome name="cog" size={15} color="#000" />
                <Text style={tw`text-gray-800 mx-2`}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex flex-row justify-first items-center py-2`}
                onPress={() => {
                  console.log("Logout clicked");
                  logout();
                }}
              >
                <FontAwesome name="sign-out" size={15} color="#000" />
                <Text style={tw`text-red-500 mx-2`}>Log out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
}
