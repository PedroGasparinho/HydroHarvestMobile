import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isStringEmpty } from "../../utils";
import { useEffect, useState } from "react";
import SelectComponent from "../SelectComponent";
import { useDispatch, useSelector } from "react-redux";
import Geolocation from "@react-native-community/geolocation";
import { availableCrops } from "../../utils/domain";
import { ALT_TEXT_COLOR, BORDER_COLOR, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { CONFIRM_ICON_MAIN_COLOR } from "../../utils/icons";
import { getClosestRegionName } from "../../utils/regions";
import { addCrop } from "../../utils/api";
import { State } from "../../store";
import { setLocationReducer } from "../../store/location.reducer";

type Props = {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function AddCropForm(props: Props) {

    //para determinar a localizacao vamos buscar as coordenadas do user
    //cada localidade vai ter as suas coordenadas
    //vamos determinar a localidade com base nas coordenadas do user

    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [selectValue, setSelectValue] = useState<string>(availableCrops[0]);
    const [region, setRegion] = useState<string>("");
    const [systemName, setSystemName] = useState<string>("");
    const [ip, setIP] = useState<string>("");

    const dispatcher = useDispatch();
    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);

    async function onSubmit() {
        setError("");
        if(isStringEmpty(name)) {
            setError("Name cannot be empty");
        } else if(isStringEmpty(systemName)) {
            setError("System name cannot be empty");
        } else if(isStringEmpty(ip)) {
            setError("IP cannot be empty");
        } else {
            if(loggedUser !== null) {
                const response = await addCrop(name, region, selectValue, loggedUser, lat, lon, ip, systemName);
                if(response.ok) {
                    props.setModalVisible(false);
                } else {
                    setError("Error: " + response.status);
                }
            }
        }
    }

    const [location, setLocation] = useState<{lat: number, lon: number}>({lat: -1000, lon: -1000});
    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                setLocation({lat: latitude, lon: longitude})
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
        setRegion(getClosestRegionName(lat, lon));
        dispatcher(setLocationReducer({lat: lat, lon: lon}));
    }, []);

    const locText = "Location: " + region ;
    const coordText = lat.toFixed(2) + "º latitude, " + lon.toFixed(2) + "º longitude";

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
            <View style={styles.nameView}>
                <Text style={styles.nameText}>System Name:</Text>
                <TextInput style={styles.nameInput} value={systemName} onChangeText={setSystemName}/>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>System IP:</Text>
                <TextInput style={styles.nameInput} value={ip} onChangeText={setIP}/>
            </View>
            <View style={styles.locationView}>
                <Text style={styles.locationText}>{locText}</Text>
                <Text style={styles.locationText}>{coordText}</Text>
            </View>
            <View style={styles.submitView}>
                <TouchableOpacity style={styles.submitStyle} onPress={onSubmit}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
                <View style={styles.submitError}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    titleView: {
        height: "5%",
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
        height: "15%",
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
        height: "10%",
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
        padding: 5,
        gap: 5,
    },

    submitStyle: {
        height: "70%",
        width: "80%",
        backgroundColor: CONFIRM_ICON_MAIN_COLOR,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ITEM_RADIUS,
    },

    submitError: {
        height: "30%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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