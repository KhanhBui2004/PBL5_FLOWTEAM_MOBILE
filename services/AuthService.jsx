import axios from "axios";
import API from "../config/axios";
import { BACKEND_URL } from "@/config";

export const loginUser = async (email, password) => {
  try {
    const { data } = await API.post("/auth/login", { email, password });

    // BE không trả `success`, nên ta coi status 200 là thành công
    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);

    // Xử lý lỗi từ BE
    let errorMessage = "Login failed"; // Default message
    if (error.response?.status === 404) {
      errorMessage = "User not found";
    } else if (error.response?.status === 500) {
      errorMessage = "Server error. Please try again later.";
    }

    return {
      success: false,
      status: error.response?.status || 500,
      error: error.response?.data?.error || "UNKNOWN_ERROR",
      message: errorMessage,
    };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    // Kiểm tra API phản hồi có lỗi không
    if (response.status === 201 && response.data?.user) {
      return {
        success: true,
        data: response.data.user,
        message: "Registration successful",
      };
    }

    return {
      success: false,
      message: response.data?.error || "Unknown error occurred",
    };
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);

    if (error.response) {
      // Xử lý lỗi 409 - User đã tồn tại
      if (error.response.status === 409) {
        return {
          success: false,
          message: "User already exists",
        };
      }
      // Xử lý lỗi từ server khác
      return {
        success: false,
        message: error.response.data?.error || "Registration failed",
      };
    }

    // Xử lý lỗi do mạng hoặc CORS
    if (error.message.includes("Network Error")) {
      return {
        success: false,
        message: "Network Error: Unable to connect to server",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const getUser = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    if (response.status === 200 && response.data?.user) {
      return {
        success: true,
        user: response.data.user,
      };
    } else {
      console.log("get user error!");
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getProjectsById = async (id) => {
  try {
    const response = await API.get(`/projects/user/${id}`);
    console.log(response);
    if (response.status === 200 && response.data?.projects) {
      return {
        success: true,
        projects: response.data.projects,
      };
    } else {
      console.log("get projects error!");
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    return {
      success: false,
      error: error.message || "Đã xảy ra lỗi khi lấy dữ liệu",
    };
  }
};

export const getDeletedProjectsByUser = async (id) => {
  try {
    const response = await API.get(`/projects/trash/${id}`);
    console.log(response);
    if (response.status === 200 && response.data?.projects) {
      return {
        success: true,
        projects: response.data.projects,
      };
    } else {
      console.log("get projects error!");
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    return {
      success: false,
      error: error.message || "Đã xảy ra lỗi khi lấy dữ liệu",
    };
  }
};

export const getProjectsByUser = async (id) => {
  try {
    const response = await API.get(`/projects/owner/${id}`);
    console.log("Service: ", response);
    if (response.status === 200 && response.data?.projects) {
      return {
        success: true,
        projects: response.data.projects,
      };
    } else {
      console.log("get projects error!");
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    return {
      success: false,
      error: error.message || "Đã xảy ra lỗi khi lấy dữ liệu",
    };
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await API.put(`/users/${id}`, user);
    if (response.status === 200) {
      return {
        success: true,
      };
    } else {
      console.log("get projects error!");
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    return {
      success: false,
      error: error.message || "Đã xảy ra lỗi khi lấy dữ liệu",
    };
  }
};

export const changePasswordAPI = async (id, data) => {
  try {
    const response = await API.post(`/users/change-password/${id}`, data);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      console.log("get projects error!");
      return {
        success: false,
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    return {
      success: false,
      error: error.message || "Đã xảy ra lỗi khi lấy dữ liệu",
    };
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("avatar", {
    uri: file.uri,
    name: file.name || "avatar.jpg",
    type: file.mimeType || "image/jpeg", // fallback nếu không có type
  });

  try {
    const response = await API.post("/upload-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload thành công:", response.data);
    return response.data;
  } catch (err) {
    console.error("Lỗi khi upload:", err);
    throw err;
  }
};

export const searchUser = async (data) => {
  try {
    console.log(data);
    const response = await API.get(`/users/search?data=${data}`);
    return {
      status: 200,
      users: response.data.users,
    };
  } catch (err) {
    console.error("Lỗi khi upload:", err);
    throw err;
  }
};

// export const handleAddEditor = async (projectId, userId) => {
//   return axios.put(`${BACKEND_URL}/api/projects/editor/${projectId}/${userId}`);
// };

// export const handleAddViewer = async (projectId, userId) => {
//   return axios.put(`${BACKEND_URL}/api/projects/viewer/${projectId}/${userId}`);
// };

export const handleAddEditor = async (projectId, userId) => {
  try {
    const response = await API.put(`/projects/editor/${projectId}/${userId}`);
    return response.data;
  } catch (err) {
    console.error("lỗi khi thêm quyền: ", err);
    throw err;
  }
};

export const handleAddViewer = async (projectId, userId) => {
  try {
    const response = await API.put(`/projects/viewer/${projectId}/${userId}`);
    return response.data;
  } catch (err) {
    console.error("lỗi khi thêm quyền: ", err);
    throw err;
  }
};
