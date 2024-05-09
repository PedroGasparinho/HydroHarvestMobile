import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";

function SystemPage() {

    const homeNave = useNavigation<homeStackProp>();

    return (
        <>
            <Text>System Page</Text>
            <Button
                onPress={() => homeNave.navigate(CROP_PAGE)}
                title="Go Back"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );
  }
  
  export default SystemPage;