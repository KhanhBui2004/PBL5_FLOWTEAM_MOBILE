import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";

export default function DocNavbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      {/* Header */}
      <View style={tw`flex flex-row items-center bg-white shadow px-6 py-2`}>
        <Image
          source={require("../../assets/images/FlowTeam.png")}
          style={tw`h-20 w-20`}
          resizeMode="contain"
        />
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
