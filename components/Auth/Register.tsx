import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useRouter } from "expo-router";
import { registerUser } from "@/services/AuthService";

const RegisterScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Thông báo!", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra email hợp lệ bằng regex đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Thông báo!", "Email không hợp lệ.");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      Alert.alert("Thông báo!", "Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== rePassword) {
      Alert.alert("Thông báo!", "Mật khẩu nhập lại không khớp.");
      return;
    }
    console.log("Register:", { username, email, password });
    const response = await registerUser(username, email, password);
    if (response) {
      console.log("Register successful:", response);
      Alert.alert(
        "Thông báo!",
        "Đăng ký thành công! vui lòng đăng nhập để truy cập."
      );
      router.push("/login");
    }
  };
  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`w-11/12 bg-white p-6 rounded-lg shadow-lg`}>
        <Text style={tw`text-2xl font-bold text-center mb-4`}>Sign Up</Text>

        {/* Username */}
        <View style={tw`mb-3`}>
          <Text style={tw`text-lg font-semibold`}>Username:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2 mt-1`}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
          />
        </View>

        {/* Email */}
        <View style={tw`mb-3`}>
          <Text style={tw`text-lg font-semibold`}>Email:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2 mt-1`}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="email@example.com"
          />
        </View>

        {/* Password */}
        <View style={tw`mb-3`}>
          <Text style={tw`text-lg font-semibold`}>Password:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2 mt-1`}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter password"
          />
        </View>

        {/* Re-enter Password */}
        <View style={tw`mb-3`}>
          <Text style={tw`text-lg font-semibold`}>Re-enter Password:</Text>
          <TextInput
            style={tw`border border-gray-300 rounded-md p-2 mt-1`}
            value={rePassword}
            onChangeText={setRePassword}
            secureTextEntry
            placeholder="Confirm password"
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded-md mt-3`}
          onPress={handleRegister}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Already have an account? */}
        <View style={tw`flex-row justify-center mt-4`}>
          <Text style={tw`text-gray-700`}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={tw`text-blue-500 font-bold ml-2`}>Login here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
