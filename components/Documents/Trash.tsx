import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import CreatedProject from "./Createdproject";

const Trash = ({ subtitle, empty }) => {
  return (
    <View>
      <Text style={tw`text-gray-800 font-bold text-lg mx-2 my-4`}>
        Recent Documents
      </Text>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {Array(8)
          .fill()
          .map((_, index) => (
            <View key={index} style={tw`w-1/2 p-2`}>
              <CreatedProject
                title={`Project ${index + 1}`}
                img="https://via.placeholder.com/150"
              />
            </View>
          ))}
      </View>
    </View>
  );
};

export default Trash;
