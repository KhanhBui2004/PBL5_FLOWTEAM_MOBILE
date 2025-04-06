import DocNavbar from "./DocNavbar";
import DocHome from "./DocHome";
import { ScrollView, View } from "react-native";
import tw from "tailwind-react-native-classnames";

const Documents = () => {
  return (
    <>
      <View style={tw`bg-gray-100 min-h-full`}>
        <View style={tw`z-10`}>
          <DocNavbar />
        </View>
        <ScrollView style={tw`z-0`}>
          <DocHome />
        </ScrollView>
      </View>
    </>
  );
};

export default Documents;
