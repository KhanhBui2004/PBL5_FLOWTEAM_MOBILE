import DocNavbar from "D:/PBL5/PBL5_FLOW_TEAMS_MOBILE/components/Documents/DocNavbar";
import Trash from "D:/PBL5/PBL5_FLOW_TEAMS_MOBILE/components/Documents/Trash";
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
          <Trash />
        </ScrollView>
      </View>
    </>
  );
};

export default Documents;
