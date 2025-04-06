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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getId = async () => {
    try {
      const Id = await AsyncStorage.getItem("userId");
      return Id;
    } catch (e) {
      console.error("Lỗi khi lấy Id:", e);
      return null;
    }
  };

  // Lấy tất cả các dự án khi component được mount
  useEffect(() => {
    const fetchProjects = async () => {
      const Id = await getId();
      const result = await getProjectsById(Id);
      console.log(result);
      if (result.success) {
        setProjects(result.projects); // Giả sử API trả về danh sách dự án dưới dạng mảng
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Hiển thị loading nếu dữ liệu chưa có
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Text style={tw`text-gray-800 font-bold text-lg mx-2 my-4`}>
        Recent Documents
      </Text>
      <View style={tw`flex-row flex-wrap justify-between`}>
        {/* {Array(8)
          .fill()
          .map((_, index) => (
            <View key={index} style={tw`w-1/2 p-2`}>
              <CreatedProject
                title={`Project ${index + 1}`}
                img="https://via.placeholder.com/150"
              />
            </View>
          ))} */}
        {projects.length === 0 ? (
          <Text>No projects available</Text>
        ) : (
          projects.map((project, index) => (
            <View key={index} style={tw`w-1/2 p-2`}>
              <CreatedProject
                title={project.name} // Giả sử mỗi dự án có thuộc tính "name"
                img={project.image || "https://via.placeholder.com/150"} // Giả sử mỗi dự án có thuộc tính "image"
              />
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default DocHome;
