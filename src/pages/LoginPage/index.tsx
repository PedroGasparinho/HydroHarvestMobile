import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { APP_SCREEN, mainStackProp } from "../../routes/stack";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from "react";
import auth from '@react-native-firebase/auth';
import { ALT_TEXT_COLOR, ITEM_RADIUS, PAGE_SUBTITLE_SIZE, PAGE_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { hashCode } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { User, setUser } from "../../store/user.reducer";
import { addClient, userExists } from "../../utils/api";
import { State } from "../../store";

function LoginPage() {

    const mainNav = useNavigation<mainStackProp>();

    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);
    const dispatcher = useDispatch();

    async function onGoogleButtonPress() {
        try {
            //if(loggedUser !== null) {
                //mainNav.navigate(APP_SCREEN);
            //} else {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                const { idToken, user } = await GoogleSignin.signIn();
    
                const name = (user.name !== null ? user.name : "Guest");
                const hydroUser = {
                    id: user.id,
                    name: name,
                    email: user.email,
                    photo: "/src/assets/defaultUserLogo.png",
                    password: hashCode(name).toString(),
                }
    
                dispatcher(setUser(hydroUser));
            
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                const res = auth().signInWithCredential(googleCredential);
                
                loginRequest(hydroUser);
    
                return res;
            //}
        } catch(error) {
            console.log(error);
        }
    }

    async function loginRequest(user: User) {
        const response = await userExists(user.id);
        if(response.ok) {
            const hasUser = await response.json();
            if(hasUser) {
                mainNav.navigate(APP_SCREEN);
            } else {
                const resAddClient = await addClient(user);
                if(resAddClient.ok) {
                    mainNav.navigate(APP_SCREEN);
                } else {
                    console.error(resAddClient.status);
                }
            }
        } else {
            console.log(response.status);
        }
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '281044714062-f001ruuci5s774op1fpmutu2tskla4t4.apps.googleusercontent.com',
        });
    }, []);

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