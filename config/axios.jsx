import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://192.168.111.59:8000/api", // URL API của bạn
  timeout: 10000, // Timeout 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (e) {
    console.error("Lỗi khi lấy token:", e);
    return null;
  }
};

// 🛠 Thêm Interceptor để xử lý token
API.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Lấy token từ AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
