import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import Icon from "react-native-vector-icons/Feather";
import tw from "tailwind-react-native-classnames";

export default function Home() {
  const player = useVideoPlayer(
    "https://corporate-assets.lucid.co/chart/080af32f-35fa-4f39-b788-e90ea8100501.mp4",
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  const player2 = useVideoPlayer(
    "https://corporate-assets.lucid.co/chart/81a2bc36-5b81-4eb2-bfeb-040fd4e9fd1b.mp4?v=1724790994704",
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

  return (
    <ScrollView style={tw`bg-gray-100 min-h-full`}>
      {/* Header */}
      <View style={tw`flex flex-row items-center bg-white shadow px-6 py-4`}>
        <Image
          source={require("../../assets/FLOWTEAMS.png")}
          style={tw`h-10 w-32`}
          resizeMode="contain"
        />
        <View style={tw`flex-1 flex-row justify-end items-center`}>
          <TouchableOpacity
            style={tw`px-4 py-2 bg-blue-600 rounded-lg flex-row items-center`}
          >
            <Icon name="log-out" size={20} color="#fff" />
            <Text style={tw`text-white ml-2`}>Log Out</Text>
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

      {/* Content */}
      <View style={tw`max-w-7xl mx-auto py-10 px-4`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-4`}>
          See your work take shape{" "}
        </Text>
        <Text style={tw`text-gray-600 text-lg`}>
          Generate visuals automatically with AI and data imports, or build your
          own using intuitive diagramming tools.
        </Text>
      </View>
      {/* Video Component */}
      <VideoView
        player={player2}
        style={{ width: "100%", height: 200, backgroundColor: "black" }}
        allowsFullscreen
        allowsPictureInPicture
      />

      {/* Left Content */}
      <View style={tw`max-w-7xl items-center my -6`}>
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
          <Icon
            name="chevron-right"
            size={18}
            color="#C05621"
            style={tw`ml-1`}
          />
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

      {/* Footer */}
      <View style={tw`w-full py-4 bg-white `}>
        <Text style={tw`text-sm text-gray-500 text-center`}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}
