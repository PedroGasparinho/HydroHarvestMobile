import { StyleSheet, Text, View } from "react-native";
import { Action, BORDER_COLOR, ITEM_BACK_COLOR, ITEM_ICON_SIZE, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, SUGGESTION_BACK_COLOR, Schedule, TEXT_COLOR, WATERING_BACK_COLOR, confirmIcon, dayDifference, deleteIcon, editIcon, getScheduleFormatted, getSpaceIfNoAction, hourDifference } from "../../utils";

type Props = {
    schedule: Schedule,
}

function ScheduleComponent(props: Props) {

    const s = props.schedule;

    const deleteAction : Action = {
        icon: deleteIcon,
        action: () => {},
    }

    const cancelAction : Action = {
        icon: deleteIcon,
        action: () => {},
    }

    const editAction : Action = {
        icon: editIcon,
        action: () => {},
    }

    const confirmAction : Action = {
        icon: confirmIcon,
        action: () => {},
    }

    const now = new Date();

    function isWateringFun() {
        return s.startDate.getTime() <= now.getTime() && now.getTime() < s.endDate.getTime();
    }

    const isWatering = isWateringFun();
    function getBackgroundColor() {
        if(s.isSuggestion) {
            return SUGGESTION_BACK_COLOR;
        } else if(isWatering) {
                return WATERING_BACK_COLOR;
        } else {
                return ITEM_BACK_COLOR;
        }
    }

    function getTopAction() {
        if(isWatering) {
            return cancelAction;
        } else {
            return deleteAction;
        }
    }

    function getBottomAction() {
        if(isWatering) {
            return undefined;
        } else if(s.isSuggestion) {
            return confirmAction;
        } else {
            return editAction;
        }
    }

    const background = {backgroundColor: getBackgroundColor()}

    function getTitle() {
        if(isWatering) {
            return "Now (Until " + getScheduleFormatted(s.endDate) + ")";
        } else {
            const dayDiff = dayDifference(now, s.startDate);
            const hourDiff = hourDifference(s.startDate, s.endDate);
            console.log(hourDiff);

            function getPreamble() {
                if(dayDiff == 0) {
                    return "Today";
                } else if(dayDiff == 1) {
                    return "Tomorrow";
                } else {
                    return getScheduleFormatted(s.startDate);
                }
            }

            return getPreamble() + " (Duration: " + hourDiff + "h)";
        }
    }

    return(
        <View style={[styles.outerView, background]}>
            <View style={styles.layerView}>
                <View style={styles.textView}>
                    <Text style={styles.titleText}>{getTitle()}</Text>
                </View>
                <>
                    {
                        getSpaceIfNoAction(getTopAction(), 10, ITEM_ICON_SIZE)
                    }
                </>
            </View>
            <View style={styles.layerView}>
                <View style={styles.textView}>
                    <Text style={styles.itemText}>Description</Text>
                </View>
                <>
                    {
                        getSpaceIfNoAction(getBottomAction(), 10, ITEM_ICON_SIZE)
                    }
                </>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    outerView: {
        borderColor: BORDER_COLOR,
        borderRadius: ITEM_RADIUS,
        borderWidth: 3,
        height: 120,
        margin: 10,
    },

    layerView: {
        height: "50%",
        flexDirection: "row",
    },

    textView: {
        width: "90%",
        justifyContent: "center",
        paddingLeft: 5,
    },

    titleText: {
        fontSize: ITEM_TITLE_SIZE,
        color: TEXT_COLOR,
        fontWeight: "bold",
    },

    itemText: {
        fontSize: ITEM_TEXT_SIZE,
        color: TEXT_COLOR,
    },

});

export default ScheduleComponent;