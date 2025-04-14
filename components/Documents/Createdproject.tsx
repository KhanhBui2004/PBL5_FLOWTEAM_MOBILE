import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

const CreatedProject = ({ title, img, id, onOpen }) => {
  const handleProjectPress = (projectId) => {
    console.log("Project ID:", projectId);
    // Bạn có thể điều hướng, lưu vào state, hoặc làm gì đó với projectId
    router.push({
      pathname: "/documents/flow",
      params: { projectId },
    });
  };
  return (
    <View
      style={tw`max-h-80 min-h-52 w-48 mr-6 mb-5 rounded-lg border border-gray-400 bg-gray-50 p-3`}
    >
      <Text style={tw`text-lg font-semibold mb-2`}>{title}</Text>
      <View style={tw`items-center mb-3`}>
        <Image source={{ uri: img }} style={tw`h-32 w-44 bg-white`} />
      </View>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <TouchableOpacity
          style={tw`bg-green-700 px-2 py-1 rounded-lg`}
          onPress={() => handleProjectPress(id)}
        >
          <Text style={tw`text-white`}>Open</Text>
        </TouchableOpacity>
        <View style={tw`flex-row`}>
          <TouchableOpacity style={tw`mr-2`}>
            <FontAwesome name="link" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={tw`mr-2`}>
            <FontAwesome name="users" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="ellipsis-v" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Picker style={tw`bg-gray-200 text-gray-900 rounded-b-lg`}>
        <Picker.Item label="No Status" value="noStatus" />
        <Picker.Item label="Complete" value="complete" />
        <Picker.Item label="Pending" value="pending" />
      </Picker> */}
    </View>
  );
};

export default CreatedProject;
