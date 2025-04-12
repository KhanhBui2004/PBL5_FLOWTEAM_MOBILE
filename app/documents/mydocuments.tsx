import DocNavbar from "@/components/Documents/DocNavbar";
import MyDoc from "@/components/Documents/MyDoc";
import { ScrollView, View } from "react-native";
import tw from "tailwind-react-native-classnames";
const Documents = () => {
  return (
    <>
      <View style={tw`bg-gray-100 min-h-full pb-20`}>
        <View style={tw`z-10`}>
          <DocNavbar />
        </View>
        <ScrollView style={tw`z-0`}>
          <MyDoc />
        </ScrollView>
      </View>
    </>
  );
};

export default Documents;
