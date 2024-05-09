import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";

function HomePage() {

    const homeNav = useNavigation<homeStackProp>();

    return (
        <>
            <Text>Home Page</Text>
            <Button
                onPress={() => homeNav.navigate(CROP_PAGE)}
                title="To Systems"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );
  }
  
  export default HomePage;