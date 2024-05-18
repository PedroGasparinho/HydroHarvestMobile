import { PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ALT_TEXT_COLOR, BORDER_COLOR, CONFIRM_ICON_MAIN_COLOR, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR, availableCrops, isStringEmpty } from "../../utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectComponent from "../SelectComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setVisible } from "../../store/modal.reducer";
import Geolocation from "@react-native-community/geolocation";

function AddCropForm() {

    //para determinar a localizacao vamos buscar as coordenadas do user
    //cada localidade vai ter as suas coordenadas
    //vamos determinar a localidade com base nas coordenadas do user

    const [name, setName] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<string>(availableCrops[0]);

    //const modalVisible = useSelector((state: RootState) => state.persistedReducer.modalState.isVisible);
    const dispatcher = useDispatch();

    function onSubmit() {
        if(isStringEmpty(name)) {
            setError(true);
        } else {
            dispatcher(setVisible(false));
        }
    }

    /*const getPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Hydroharvest Location Permission',
                    message:
                    'Hydroharvest needs access to your location to add a new crop',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };*/

    const [location, setLocation] = useState<{lat: number, lon: number}>({lat: -1000, lon: -1000});
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                setLocation({lat: latitude, lon: longitude})
                console.log("Lat: " + latitude + " Lon: " + longitude);
            },
            error => {
                console.log("Error: " + error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        )
    }

    const {lat, lon} = location;


    useEffect(() => {
        getCurrentLocation();
    }, []);

    const locText = "Location: " + lat.toFixed(2) + "º latitude, " + lon.toFixed(2) + "º longitude";

    return(
        <>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>Add Crop</Text>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>Name:</Text>
                <TextInput style={styles.nameInput} value={name} onChangeText={setName}/>
            </View>
            <View style={styles.cropView}>
                <Text style={styles.cropText}>Type of crop: </Text>
                <SelectComponent data={availableCrops} width={80} selectValue={selectValue} setSelectValue={setSelectValue}/>
            </View>
            <View style={styles.locationView}>
                <Text style={styles.locationText}>{locText}</Text>
            </View>
            <View style={styles.submitView}>
                <TouchableOpacity style={styles.submitStyle} onPress={onSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
                <>
                    {
                        error ? <Text style={styles.errorText}>Invalid name</Text> : <></>
                    }
                </>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    titleView: {
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    titleText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE,
        fontWeight: "bold"
    },

    nameView: {
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },

    nameText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    },

    nameInput: {
        borderRadius: ITEM_RADIUS,
        borderColor: BORDER_COLOR,
        borderWidth: 2,
        width: "80%",
        height: "50%",
    },

    cropView: {
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },

    cropText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    },

    locationView: {
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    locationText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    },

    submitView: {
        height: "20%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },

    submitStyle: {
        height: "80%",
        width: "80%",
        backgroundColor: CONFIRM_ICON_MAIN_COLOR,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ITEM_RADIUS,
    },

    submitText: {
        color: ALT_TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE,
    },

    errorText: {
        color: ERROR_TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    },


});

export default AddCropForm;