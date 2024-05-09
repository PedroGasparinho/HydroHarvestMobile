import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { HOME_PAGE, SCHEDULE_PAGE, SYSTEM_PAGE, homeStackProp } from "../../routes/homeStack";

function CropPage() {

    const homeNav = useNavigation<homeStackProp>();

    return (
        <>
            <Text>Crop Page</Text>
            <Button
                onPress={() => homeNav.navigate(HOME_PAGE)}
                title="Go Back"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => homeNav.navigate(SYSTEM_PAGE)}
                title="To Systems"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => homeNav.navigate(SCHEDULE_PAGE)}
                title="To Schedule"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );
  }
  
  export default CropPage;