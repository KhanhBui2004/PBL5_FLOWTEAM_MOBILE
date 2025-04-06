import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import CreatedProject from "./Createdproject";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getProjectsByUser } from "@/services/AuthService";

const MyDoc = ({ subtitle, empty }) => {
  const [myDoc, setMyDoc] = useState([]);
  const fetchmyDoc = async () => {
    try {
      let id = await AsyncStorage.getItem("userId");
      const response = await getProjectsByUser(id); // Replace with your API endpoint
      setMyDoc(response.projects); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchmyDoc();
  }, []);

  return (
    <View>
      <Text style={tw`text-gray-800 font-bold text-lg mx-2 my-4`}>
        My Documents
      </Text>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {myDoc.length === 0 ? (
          <View style={tw`w-full p-4 rounded-lg items-center`}>
            <FontAwesome name="folder" size={24} color="gray" />
            <Text style={tw`text-gray-600 mt-2`}>
              No documents in the my documents
            </Text>
          </View>
        ) : (
          myDoc.map((e, index) => (
            <View key={index} style={tw`w-1/2 p-2`}>
              <CreatedProject
                title={e.name}
                img="https://via.placeholder.com/150"
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default MyDoc;
