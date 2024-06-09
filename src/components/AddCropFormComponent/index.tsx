import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isStringEmpty } from "../../utils";
import { useEffect, useState } from "react";
import SelectComponent from "../SelectComponent";
import { useDispatch, useSelector } from "react-redux";
import { availableCrops } from "../../utils/domain";
import { ALT_TEXT_COLOR, BORDER_COLOR, BORDER_WIDTH, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { CONFIRM_ICON_MAIN_COLOR } from "../../utils/icons";
import { regions } from "../../utils/regions";
import { addCrop, sendCropToBoard } from "../../utils/api";
import { State } from "../../store";
import SelectIndexComponent from "../SelectIndexComponent";
import { setDirty } from "../../store/dirty.reducer";

type Props = {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function AddCropForm(props: Props) {

    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [selectValue, setSelectValue] = useState<string>(availableCrops[0]);
    const [systemName, setSystemName] = useState<string>("");
    const [ip, setIP] = useState<string>("");
    const [regionIdx, setRegionIdx] = useState<number>(0);

    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);
    const userLoc = useSelector((state: State) => state.persistedReducer.locationReducer.location);
    const userRegion = useSelector((state: State) => state.persistedReducer.locationReducer.closestRegionIdx);

    const dispatcher = useDispatch();

    /*async function birra(){
        const response = await setStartWatering();
        if(response.ok) {
            console.log(await response.json());
        }else{
            console.log(response.status);
        }
    }*/

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
                const res = await sendCropToBoard(selectValue);
                console.log(res);
                if(res.ok) {
                    const response = await addCrop(name, regions[regionIdx].name, selectValue, loggedUser, regions[regionIdx].lat, regions[regionIdx].lon, ip, systemName);
                    if(response.ok) {
                        props.setModalVisible(false);
                        dispatcher(setDirty(true));
                    } else {
                        setError("Server Error: " + response.status);
                    }
                } else {
                    setError("Board Error: " + res.status);
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
        borderWidth: BORDER_WIDTH,
        width: "80%",
        height: "50%",
    },

    cropView: {
        height: "15%",
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
        height: "15%",
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