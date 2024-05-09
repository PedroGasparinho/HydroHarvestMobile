import { Button, Text } from "react-native";
import { APP_SCREEN, mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";

function LoginPage() {

    const mainNav = useNavigation<mainStackProp>();

    const login = () => mainNav.navigate(APP_SCREEN);

    return (
        <>
            <Text>Login Page</Text>
            <Button
                onPress={login}
                title="Login"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );
  }
  
  export default LoginPage;