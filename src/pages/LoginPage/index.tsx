import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { APP_SCREEN, mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { ALT_TEXT_COLOR, ITEM_RADIUS, PAGE_SUBTITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";

function LoginPage() {

    const mainNav = useNavigation<mainStackProp>();

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

    /*return (
        <>
            <Text>Login Page</Text>
            <Button
                onPress={onGoogleButtonPress}
                title="Login"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );*/

    return(
        <>
            <View style={styles.imageView}>
                <Image style={styles.imageStyle} source={require("../../assets/hydroHarvest.png")}/>
            </View>
            <View style={styles.bodyView}>
                <View style={styles.titleView}>
                    <Text style={styles.titleStyle}>Welcome</Text>
                </View>
                <View style={styles.helpView}>
                    <Text style={styles.helpStyle}>Please sign-in with Google</Text>
                </View>
                <View style={styles.emptyView}/>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={onGoogleButtonPress}>
                        <Text style={styles.buttonTextStyle}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    imageView: {
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    imageStyle: {
        width: "100%",
        height: "100%"
    },

    bodyView: {
        height: "70%",
        width: "100%",
    },

    titleView: {
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    titleStyle: {
        fontSize: PAGE_TITLE_SIZE,
        fontWeight: "bold",
        color: TEXT_COLOR,
    },

    helpView: {
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    helpStyle: {
        fontSize: PAGE_SUBTITLE_SIZE,
        color: TEXT_COLOR,
    },

    emptyView: {
        height: "40%",
        width: "100%",
    },

    buttonView: {
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonStyle: {
        height: "50%",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        borderRadius: ITEM_RADIUS,
    },

    buttonTextStyle: {
        fontSize: PAGE_SUBTITLE_SIZE,
        color: ALT_TEXT_COLOR,
    },


});
  
export default LoginPage;