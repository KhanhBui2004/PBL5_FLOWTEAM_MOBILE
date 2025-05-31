import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  searchUser,
  handleAddEditor,
  handleAddViewer,
  trashProject,
} from "@/services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatedProject = ({ title, img, id, project }) => {
  const [userSearch, setUserSearch] = useState([]);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRoleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Lưu user khi nhấn "Thêm"
  const [projectData, setProjectData] = useState(project);

  const handleProjectPress = (projectId) => {
    console.log("Project ID:", projectId);
    // Bạn có thể điều hướng, lưu vào state, hoặc làm gì đó với projectId
    router.push({
      pathname: "/documents/flow",
      params: { projectId },
    });
  };

  const handleSearchUser = async () => {
    console.log(searchQuery);
    let response = await searchUser(searchQuery.trim());
    if (response.status === 200) {
      console.log(response.users);

      // Lấy danh sách ID đã tồn tại
      const existingUserIds = new Set([
        project.owner._id,
        ...project.editors.map((u) => u._id),
        ...project.viewers.map((u) => u._id),
      ]);
      console.log(existingUserIds);

      // Lọc ra những user chưa tồn tại
      const filteredUsers = response.users.filter(
        (user) => !existingUserIds.has(user._id)
      );

      setUserSearch(filteredUsers);
    }
  };

  const getId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      return id;
    } catch (e) {
      console.error("Lỗi khi lấy token:", e);
      return null;
    }
  };

  const handleUserPress = () => {
    setUserModalVisible(true);
  };

  const handleDeleteToTrash = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn đưa dự án vào thùng rác?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: async () => {
            try {
              let userid = getId();
              await trashProject(userid, project._id);
              Alert.alert("Thông báo", "Đã thêm vào thùng rác!");
            } catch (error) {
              console.error("Lỗi khi xóa dự án:", error);
              Alert.alert("Lỗi", "Không thể thêm vào thùng rác.");
            }
          },
          style: "destructive", // màu đỏ trên iOS
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    setProjectData(project); // đồng bộ khi prop project thay đổi
  }, [project]);

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
            <FontAwesome
              name="users"
              size={20}
              color="black"
              onPress={handleUserPress}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteToTrash}>
            <FontAwesome name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isUserModalVisible}
        onRequestClose={() => setUserModalVisible(false)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`bg-white p-4 rounded-lg w-11/12`}>
            <Text style={tw`text-lg font-bold mb-2`}>
              🔍 Tìm kiếm người dùng
            </Text>

            {/* Ô nhập + nút tìm kiếm */}
            <View style={tw`flex-row items-center mb-4`}>
              <TextInput
                style={tw`flex-1 border border-gray-300 rounded p-2 mr-2`}
                placeholder="Nhập tên người dùng..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity
                style={tw`bg-blue-500 px-4 py-2 rounded`}
                onPress={() => {
                  // Gọi API tìm kiếm hoặc lọc danh sách tại đây
                  handleSearchUser();
                }}
              >
                <Text style={tw`text-white`}>Tìm</Text>
              </TouchableOpacity>
            </View>

            {userSearch.length > 0 && (
              <View style={tw`mb-4`}>
                <Text style={tw`text-base font-semibold mb-1`}>
                  🔎 Kết quả tìm kiếm:
                </Text>
                {userSearch.map((user, index) => (
                  <View
                    key={index}
                    style={tw`w-full flex-row justify-between items-center p-2 border-b border-gray-200`}
                  >
                    <Text>{user.name}</Text>
                    {/* Bạn có thể thêm nút để thêm người này vào project nếu muốn */}
                    <TouchableOpacity
                      style={tw`bg-green-500 px-3 py-1 rounded`}
                      onPress={() => {
                        console.log("Thêm người dùng:", user.name);
                        setSelectedUser(user);
                        setRoleModalVisible(true);
                        // Viết thêm logic thêm user vào project tại đây nếu cần
                      }}
                    >
                      <Text style={tw`text-white`}>Thêm</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Thông tin project */}
            <Text style={tw`text-lg font-bold mb-2`}>📁 Thông tin Project</Text>

            <View style={tw`mb-4`}>
              <Text style={tw`text-base font-semibold mb-1`}>Editors:</Text>
              {projectData?.editors?.map((e, index) => (
                <View key={index} style={tw`w-1/2 p-2`}>
                  <Text>{e.name}</Text>
                </View>
              ))}
              <Text style={tw`text-base font-semibold mb-1`}>Viewers:</Text>
              {projectData?.viewers?.map((e, index) => (
                <View key={index} style={tw`w-1/2 p-2`}>
                  <Text>{e.name}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={tw`mt-2 bg-red-500 py-2 rounded`}
              onPress={() => setUserModalVisible(false)}
            >
              <Text style={tw`text-white text-center`}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={isRoleModalVisible}
        animationType="fade"
        onRequestClose={() => setRoleModalVisible(false)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`bg-white rounded-lg p-5 w-10/12`}>
            <Text style={tw`text-lg font-bold mb-4 text-center`}>
              Chọn quyền cho người dùng: {selectedUser?.name}
            </Text>

            <TouchableOpacity
              style={tw`bg-blue-500 px-4 py-2 rounded mb-2`}
              onPress={async () => {
                try {
                  await handleAddEditor(project._id, selectedUser._id);
                  alert("✅ Đã thêm quyền Editor");
                  setProjectData((prev) => ({
                    ...prev,
                    editors: [...prev.editors, selectedUser],
                  }));
                } catch (e) {
                  alert("❌ Lỗi khi thêm quyền");
                } finally {
                  setRoleModalVisible(false);
                }
              }}
            >
              <Text style={tw`text-white text-center`}>Editor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`bg-green-500 px-4 py-2 rounded mb-2`}
              onPress={async () => {
                try {
                  await handleAddViewer(project._id, selectedUser._id);
                  alert("✅ Đã thêm quyền Viewer");
                  setProjectData((prev) => ({
                    ...prev,
                    viewers: [...prev.viewers, selectedUser],
                  }));
                } catch (e) {
                  alert("❌ Lỗi khi thêm quyền");
                } finally {
                  setRoleModalVisible(false);
                }
              }}
            >
              <Text style={tw`text-white text-center`}>Viewer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRoleModalVisible(false)}
              style={tw`mt-2`}
            >
              <Text style={tw`text-center text-red-500`}>Huỷ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreatedProject;
