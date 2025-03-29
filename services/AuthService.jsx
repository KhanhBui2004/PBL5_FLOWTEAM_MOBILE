import API from "../config/axios";

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
