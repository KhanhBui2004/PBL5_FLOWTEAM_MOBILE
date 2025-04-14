import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import CreatedProject from "./Createdproject";
import { useEffect, useState } from "react";
import { getProjectsById } from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DocHome = ({ subtitle, empty }) => {
  const [projects, setProjects] = useState([]);

  // Lấy tất cả các dự án khi component được mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let Id = await AsyncStorage.getItem("userId");
        const response = await getProjectsById(Id);
        setProjects(response.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
    console.log(projects);
  }, []);

  return (
    <View>
      <Text style={tw`text-gray-800 font-bold text-lg mx-2 my-4`}>
        Recent Documents
      </Text>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {projects.length === 0 ? (
          <View style={tw`w-full p-4 rounded-lg items-center`}>
            <FontAwesome name="folder" size={24} color="gray" />
            <Text style={tw`text-gray-600 mt-2`}>
              No documents in the my documents
            </Text>
          </View>
        ) : (
          projects.map((project, index) => (
            <View key={index} style={tw`w-1/2 p-2`}>
              <CreatedProject
                id={project._id}
                title={project.name} // Giả sử mỗi dự án có thuộc tính "name"
                img={
                  "http://192.168.110.2:8000/imgs/projectImgs/" + project.img
                } // Giả sử mỗi dự án có thuộc tính "image"
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default DocHome;
