import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { Video } from "expo-av";
import tw from "tailwind-react-native-classnames";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const player = useVideoPlayer(
    "https://corporate-assets.lucid.co/chart/080af32f-35fa-4f39-b788-e90ea8100501.mp4",
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const images = [
    "https://corporate-assets.lucid.co/chart/c94af1dc-aef3-4158-b6cc-b839627eff0c.png?v=1722897807991",
    "https://corporate-assets.lucid.co/chart/af34f0dc-c516-4fde-be04-c25a3e607b36.png?v=1722987794798",
    "https://corporate-assets.lucid.co/chart/dde86464-d8d9-4b21-8108-45c1d434d68b.png?v=1722987832856",
    "https://corporate-assets.lucid.co/chart/3f663dae-39b6-4bf7-96e7-1e2559ef6f60.png?v=1722897615353",
    "https://corporate-assets.lucid.co/chart/aa867324-1c6b-41c0-86d9-070b357efeea.png?v=1707803750506",
    "https://corporate-assets.lucid.co/chart/de58f5ef-178d-4c71-8a8c-ae9991d528d5.png?v=1722987940228",
    "https://corporate-assets.lucid.co/chart/a7836423-d92a-4928-bff1-a55c0445d5d1.png?v=1722897837619",
    "https://corporate-assets.lucid.co/chart/8d3d7da6-7b57-477a-b5e0-7695732c1fb8.png?v=1722987909188",
  ];

  const profiles = [
    {
      id: "1",
      name: "Từ Đức Mạnh",
      role: "Leader, Back-end Developer",
      description:
        "Bonnie drives the technical strategy of the Flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    },
    {
      id: "2",
      name: "Trần Quang Thắng",
      role: "Mobile App Developer, Back-end Developer",
      description:
        "Jese drives the technical strategy of the flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
    },
    {
      id: "3",
      name: "Bùi Quốc Khánh",
      role: "Mobile App Developer",
      description:
        "Michael drives the technical strategy of the flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
    },
    {
      id: "4",
      name: "Hoàng Đăng Khôi",
      role: "Front-end Developer",
      description:
        "Lana drives the technical strategy of the flowbite platform and brand.",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png",
    },
  ];

  const ProfileCard = ({ profile }) => {
    return (
      <View
        style={tw`flex-row items-center bg-gray-200 rounded-lg shadow p-4 mb-4`}
      >
        <Image
          style={tw`w-24 h-24 rounded-lg`}
          source={{ uri: profile.image }}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-xl font-bold text-gray-900`}>
            {profile.name}
          </Text>
          <Text style={tw`text-gray-500`}>{profile.role}</Text>
          <Text style={tw`mt-2 text-gray-500`}>{profile.description}</Text>
          <View style={tw`flex-row mt-3`}>
            {["facebook", "twitter", "github", "globe"].map((icon, index) => (
              <TouchableOpacity key={icon} style={index > 0 ? tw`ml-4` : null}>
                <FontAwesome name={icon} size={20} color="#6b7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const ProfileList = () => {
    return (
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfileCard profile={item} />}
        contentContainerStyle={tw`p-4`}
      />
    );
  };

  return (
    <ScrollView style={tw`bg-gray-100 min-h-full`}>
      {/* Header */}
      <View style={tw`flex flex-row items-center bg-white shadow px-6 py-4`}>
        <Image
          source={require("../../assets/images/FLOWTEAMS.png")}
          style={tw`h-10 w-32`}
          resizeMode="contain"
        />
        <View style={tw`flex-1 flex-row justify-end items-center`}>
          <TouchableOpacity
            style={tw`px-4 py-2 bg-blue-600 rounded-lg flex-row items-center`}
            onPress={() => router.push("/login")}
          >
            <FontAwesome name="sign-in" size={25} color="#fff" />
            <Text style={tw`text-white ml-2`}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={tw`max-w-7xl mx-auto py-10 px-4`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-4`}>
          Diagramming powered by{" "}
          <Text style={tw`text-blue-600`}>intelligence</Text>
        </Text>
        <Text style={tw`text-gray-600 text-lg`}>
          Create next-generation diagrams with AI, data, and automation in
          Lucidchart.
        </Text>
      </View>
      {/* Video Component */}
      <VideoView
        player={player}
        style={{ width: "100%", height: 200, backgroundColor: "black" }}
        allowsFullscreen
        allowsPictureInPicture
      />

      {/* Left Content */}
      <View style={tw`my-5 max-w-7xl items-center my -6`}>
        <Text style={tw`text-3xl font-bold text-gray-800 text-center`}>
          Where seeing becomes doing,{" "}
          <Text style={tw`text-blue-600`}>faster</Text>
        </Text>
        <Text
          style={tw`text-gray-600 text-lg text-center leading-relaxed mt-2`}
        >
          Not sure how to visualize your systems, processes, or org structures?
          Get inspiration (and a big head start) with Lucidchart templates.
        </Text>
        <TouchableOpacity style={tw`flex-row items-center mt-4`}>
          <Text style={tw`text-orange-700 font-semibold`}>
            Explore templates
          </Text>
          {/* <Icon
            name="chevron-right"
            size={18}
            color="#C05621"
            style={tw`ml-1`}
          /> */}
          <FontAwesome name="chevron-right" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Right Images */}
      <View style={tw`flex-row flex-wrap justify-center gap-2`}>
        {images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={tw`w-20 h-20 rounded-md shadow-sm m-1`}
          />
        ))}
      </View>

      {/* Content top */}
      <View style={tw`max-w-7xl mx-auto py-10 px-4`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-4 text-center`}>
          About us
        </Text>
        <Text style={tw`text-gray-600 text-lg text-center`}>
          Explore the whole collection of open-source web components and
          elements built with the utility classes from Tailwind
        </Text>
      </View>
      {/* Content under*/}
      {/* <View
        style={tw`flex-row items-center bg-gray-200 rounded-lg shadow p-4 border-radius-50`}
      >
        <Image
          style={tw`w-24 h-24 rounded-lg`}
          source={{
            uri: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
          }}
        />
        <View style={tw`ml-4 flex-1`}>
          <Text style={tw`text-xl font-bold text-gray-900`}>Từ Đức Mạnh</Text>
          <Text style={tw`text-gray-500`}>Leader, Back-end Developer</Text>
          <Text style={tw`mt-2 text-gray-500`}>
            Bonnie drives the technical strategy of the Flowbite platform and
            brand.
          </Text>
          <View style={tw`flex-row mt-3`}>
            <TouchableOpacity>
              <FontAwesome name="facebook" size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`ml-4`}>
              <FontAwesome name="twitter" size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`ml-4`}>
              <FontAwesome name="github" size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`ml-4`}>
              <FontAwesome name="globe" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View> */}
      <ProfileList />

      {/* Footer */}
      <View style={tw`w-full py-4 bg-white `}>
        <Text style={tw`text-sm text-gray-500 text-center`}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}
