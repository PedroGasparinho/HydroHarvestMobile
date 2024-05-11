import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/titleBarComponent";

function SystemPage() {

    const homeNave = useNavigation<homeStackProp>();

    return (
        <>
            <TitleBarComponent title={"System Page"}/>
        </>
    );
  }
  
  export default SystemPage;