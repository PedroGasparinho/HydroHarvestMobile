import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Crop, System } from "../../utils/domain";
import { ALT_TEXT_COLOR, ERROR_TEXT_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import { CONFIRM_ICON_MAIN_COLOR } from "../../utils/icons";
import { addWater } from "../../utils/api";
import { State } from "../../store";
import { Datepicker } from "@ui-kitten/components";
import SelectComponent from "../SelectComponent";
import { hours, minutes } from "../../utils/staticData";

type Props = {
    crop: Crop;
    system: System;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function AddScheduleForm(props: Props) {

    const [error, setError] = useState<string>("");

    const [startDate, setStartDate] = useState(new Date());
    const [startHour, setStartHour] = useState(hours[0]);
    const [startMinutes, setStartMinutes] = useState(minutes[0]);

    const [endDate, setEndDate] = useState(new Date());
    const [endHour, setEndHour] = useState(hours[1]);
    const [endMinutes, setEndMinutes] = useState(minutes[0]);

    const system = props.system;
    const crop = props.crop;

    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);

    async function onSubmit() {
        setError("");
        if(isSameDate()) {
            setError("Start date cannot be equal to end date");
        } else if(isStartBeforeEnd()) {
            setError("Start date cannot occur after end date");
        } else {
            if(loggedUser !== null) {
                const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), Number(startHour), Number(startMinutes));
                const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), Number(endHour), Number(endMinutes));
                const now = new Date();
                if(start < now) {
                    setError("Start date has already passed");
                } else if(end <= now) {
                    setError("End date has already passed");
                } else {
                    const response = await addWater(crop, loggedUser, system, start, end);
                    if(response.ok) {
                        props.setModalVisible(false);
                    } else {
                        setError("Error: " + response.status);
                    }
                }
            }
        }
    }

    function isSameDate() {
        const one = startDate.getTime() == endDate.getTime()
        const two = Number(startHour) == Number(endHour)
        const three = Number(startMinutes) == Number(endMinutes)
        return one && two && three;
    }

    function isStartBeforeEnd() {
        const one = startDate.getTime() > endDate.getTime()
        const two = startDate.getTime() == endDate.getTime() 
            && Number(startHour) > Number(endHour)
        const three = startDate.getTime() == endDate.getTime() 
            && Number(startHour) == Number(endHour) 
            && Number(startMinutes) > Number(endMinutes)
        return one || two || three;
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
                <Datepicker date={endDate} onSelect={nextDate => setEndDate(nextDate)} style={{width: "80%"}}/>
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
        height: "15%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
        fontSize: ITEM_TEXT_SIZE,
    },

    timeView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    submitView: {
        height: "25%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        gap: 5,
    },

    submitStyle: {
        height: "60%",
        width: "80%",
        backgroundColor: CONFIRM_ICON_MAIN_COLOR,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ITEM_RADIUS,
    },

    submitError: {
        height: "15%",
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