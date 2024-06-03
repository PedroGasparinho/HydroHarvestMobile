import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { isStringEmpty } from "../../utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisible } from "../../store/modal.reducer";
import Geolocation from "@react-native-community/geolocation";
import { Crop, availableCrops } from "../../utils/domain";
import { ALT_TEXT_COLOR, BORDER_COLOR, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { CONFIRM_ICON_MAIN_COLOR } from "../../utils/icons";
import { getClosestRegion } from "../../utils/regions";
import { addCrop, addSystem } from "../../utils/api";
import { State } from "../../store";
import { setLocationReducer } from "../../store/location.reducer";
import { Datepicker } from "@ui-kitten/components";
import SelectComponent from "../SelectComponent";
import { hours, minutes } from "../../utils/staticData";

type Props = {
    crop: Crop;
}

function AddScheduleForm(props: Props) {

    const [error, setError] = useState<string>("");

    const [startDate, setStartDate] = useState(new Date());
    const [startHour, setStartHour] = useState(hours[0]);
    const [startMinutes, setStartMinutes] = useState(minutes[0]);

    const [endDate, setEndDate] = useState(new Date());
    const [endHour, setEndHour] = useState(hours[1]);
    const [endMinutes, setEndMinutes] = useState(minutes[0]);

    const dispatcher = useDispatch();
    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);

    async function onSubmit() {
        setError("");
        if(true) {
            //TODO
        } else {
            /*if(loggedUser !== null) {
                const response = await addSystem(props.crop.id, loggedUser, lat, lon, ip, systemName);
                if(response.ok) {
                    dispatcher(setVisible(false));
                } else {
                    setError("Error: " + response.status);
                }
            }*/
        }
    }

    return(
        <>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>Add Watering Schedule</Text>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>Start Day:</Text>
                <Datepicker date={startDate} onSelect={nextDate => setStartDate(nextDate)} style={{width: "80%"}}/>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>Start time:</Text>
                <View style={styles.timeView}>
                    <SelectComponent data={hours} width={40} selectValue={startHour} setSelectValue={setStartHour}/>
                    <SelectComponent data={minutes} width={40} selectValue={startMinutes} setSelectValue={setStartMinutes}/>
                </View>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>End Day:</Text>
                <Datepicker date={startDate} onSelect={nextDate => setStartDate(nextDate)} style={{width: "80%"}}/>
            </View>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>End time:</Text>
                <View style={styles.timeView}>
                    <SelectComponent data={hours} width={40} selectValue={endHour} setSelectValue={setEndHour}/>
                    <SelectComponent data={minutes} width={40} selectValue={endMinutes} setSelectValue={setEndMinutes}/>
                </View>
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

    timeView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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

export default AddScheduleForm;