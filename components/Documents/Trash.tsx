import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import CreatedProject from "./Createdproject";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDeletedProjectsByUser } from "@/services/AuthService";

const Trash = ({ subtitle, empty }) => {
  const [myTrashDocs, setMyTrashDoc] = useState([]);
  const fetchMyTrashDocs = async () => {
    try {
      let id = await AsyncStorage.getItem("userId");
      const response = await getDeletedProjectsByUser(id); // Replace with your API endpoint
      setMyTrashDoc(response.projects); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchMyTrashDocs();
  }, []);
  return (
    <View>
      <Text style={tw`text-gray-800 font-bold text-lg mx-2 my-4`}>Trash</Text>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {myTrashDocs.length === 0 ? (
          <View style={tw`w-full p-4 rounded-lg items-center`}>
            <FontAwesome name="trash" size={24} color="gray" />
            <Text style={tw`text-gray-600 mt-2`}>
              No documents in the trash
            </Text>
          </View>
        ) : (
          myTrashDocs.map((e, index) => (
            <View key={index} style={tw`w-1/2 p-2`}>
              <CreatedProject
                id={e._id}
                title={e.name}
                img={"http://192.168.110.2:8000/imgs/projectImgs/" + e.img}
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default Trash;
