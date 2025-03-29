import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.1.74:8000/api", // Thay URL API của bạn vào đây
  timeout: 10000, // Timeout 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛠 Thêm Interceptor để xử lý token
API.interceptors.request.use(
  async (config) => {
    // Lấy token từ AsyncStorage hoặc context
    const token = "your-auth-token"; // Lấy token từ AsyncStorage nếu có
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
