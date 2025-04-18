import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";
import tw from "tailwind-react-native-classnames";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginUser } from "../../services/AuthService"; // Adjust the import path as necessary

export default function LoginScreen({ token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const { setUserId } = useContext(UserContext);

  const saveId = async (id) => {
    try {
      console.log(id);
      await AsyncStorage.setItem("userId", id);
    } catch (e) {
      console.error("Lỗi khi lưu id:", e);
    }
  };

  const saveToken = async (token) => {
    try {
      console.log(token);
      await AsyncStorage.setItem("userToken", token);
    } catch (e) {
      console.error("Lỗi khi lưu id:", e);
    }
  };

  const handleLogin = async () => {
    console.log("Login:", { email, password });
    const response = await loginUser(email, password);
    console.log(response);

    if (response) {
      const { id, token } = response.user;
      saveId(id);
      saveToken(token);
      console.log("Login successful:", response);
      router.push("/documents/");
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/home");
    }
  }, [token]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100 px-4`}>
      <View style={tw`w-full max-w-md p-6 bg-white rounded-lg shadow-md`}>
        <Text style={tw`text-2xl font-bold text-center mb-4`}>Login</Text>
        {/* <button onClick={() => navigation.navigate("Home")}>Go to Home</button> */}

        {/* Email Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 font-medium`}>Email:</Text>
          <TextInput
            style={tw`mt-1 p-2 border border-gray-300 rounded-lg`}
            placeholder="email@example.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 font-medium`}>Password:</Text>
          <TextInput
            style={tw`mt-1 p-2 border border-gray-300 rounded-lg`}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={() => console.log("Forgot password?")}>
          <Text style={tw`text-blue-500 text-right`}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={tw`bg-blue-500 mt-4 p-3 rounded-lg`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-center font-bold`}>Login</Text>
        </TouchableOpacity>

        {/* Google Sign-in */}
        <TouchableOpacity
          style={tw`mt-4 p-3 border border-gray-300 rounded-lg flex-row justify-center items-center`}
        >
          <Svg width="24" height="24" viewBox="0 0 48 48">
            <Path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </Svg>
          <Text style={tw`ml-2 text-gray-700 font-medium`}>
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Facebook Sign-in */}
        {/* <TouchableOpacity
          style={tw`mt-4 p-3 border border-gray-300 rounded-lg flex-row justify-center items-center`}
        >
          <Svg width="24" height="24" viewBox="0 0 448 512">
            <Path
              fill="currentColor"
              d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
            />
          </Svg>
          <Text style={tw`ml-2 text-gray-700 font-medium`}>
            Sign in with Facebook
          </Text>
        </TouchableOpacity> */}

        {/* Register Link */}
        <View style={tw`mt-4 flex-row justify-center`}>
          <Text style={tw`text-gray-700`}>New user? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={tw`text-blue-500`}>Create account here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
