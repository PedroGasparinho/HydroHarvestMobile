import { Button, Text } from "react-native";
import { APP_SCREEN, mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from "react";
import auth from '@react-native-firebase/auth';

function LoginPage() {

    const mainNav = useNavigation<mainStackProp>();

    const login = () => mainNav.navigate(APP_SCREEN);

    async function onGoogleButtonPress() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken, user } = await GoogleSignin.signIn();

            console.log(idToken);
            console.log(user);
        
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
            // Sign-in the user with the credential
            const res = auth().signInWithCredential(googleCredential);
            
            mainNav.navigate(APP_SCREEN);

            return res;
        } catch(error) {
            console.log(error);
        }
      }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '281044714062-f001ruuci5s774op1fpmutu2tskla4t4.apps.googleusercontent.com',
          });
    }, [])

    return (
        <>
            <Text>Login Page</Text>
            <Button
                onPress={onGoogleButtonPress}
                title="Login"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );
  }
  
  export default LoginPage;