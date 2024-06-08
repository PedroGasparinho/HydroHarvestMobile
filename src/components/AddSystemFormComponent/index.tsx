import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isStringEmpty } from "../../utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Crop } from "../../utils/domain";
import { ALT_TEXT_COLOR, BORDER_COLOR, BORDER_WIDTH, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { CONFIRM_ICON_MAIN_COLOR } from "../../utils/icons";
import { regions } from "../../utils/regions";
import { addSystem } from "../../utils/api";
import { State } from "../../store";
import SelectIndexComponent from "../SelectIndexComponent";

type Props = {
    crop: Crop;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function AddSystemForm(props: Props) {

    const [error, setError] = useState<string>("");
    const [systemName, setSystemName] = useState<string>("");
    const [ip, setIP] = useState<string>("");

    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);
    const userLoc = useSelector((state: State) => state.persistedReducer.locationReducer.location);
    const userRegion = useSelector((state: State) => state.persistedReducer.locationReducer.closestRegionIdx);

    const [regionIdx, setRegionIdx] = useState<number>(0);

    async function onSubmit() {
        setError("");
        if(isStringEmpty(systemName)) {
            setError("System name cannot be empty");
        } else if(isStringEmpty(ip)) {
            setError("IP cannot be empty");
        } else {
            if(loggedUser !== null) {
                const response = await addSystem(props.crop.id, loggedUser, regions[regionIdx].lat, regions[regionIdx].lon, ip, systemName);
                if(response.ok) {
                    props.setModalVisible(false);
                } else {
                    setError("Error: " + response.status);
                }
            }
        }
    }

    useEffect(() => {
        setRegionIdx(userRegion);
    }, [])

    const locText = "Closest location: " + regions[userRegion].name;
    const coordText = userLoc.lat.toFixed(2) + "º latitude, " + userLoc.lon.toFixed(2) + "º longitude";

    return(
        <>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>Add System</Text>
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
            <Text style={styles.nameText}>System Location:</Text>
                <SelectIndexComponent data={regions.map(r => { return r.name; })} width={80} selectValue={regionIdx} setSelectValue={setRegionIdx}/>
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
        height: "15%",
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
        height: "17.5%",
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
        borderWidth: BORDER_WIDTH,
        width: "80%",
        height: "50%",
    },

    locationView: {
        height: "30%",
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

export default AddSystemForm;