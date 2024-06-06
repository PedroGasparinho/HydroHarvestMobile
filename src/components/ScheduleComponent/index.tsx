import { StyleSheet, Text, View } from "react-native";
import { Action, getSpaceIfNoAction} from "../../utils";
import { Schedule } from "../../utils/domain";
import { isInBetweenDates, getScheduleFormatted, dayDifference, hourDifference, getHourFormatted } from "../../utils/date";
import { confirmIcon, cancelIcon } from "../../utils/icons";
import { SUGGESTION_BACK_COLOR, WATERING_BACK_COLOR, ITEM_BACK_COLOR, ITEM_ICON_SIZE, BORDER_COLOR, ITEM_RADIUS, ITEM_TITLE_SIZE, TEXT_COLOR, ITEM_TEXT_SIZE } from "../../utils/styles";

type Props = {
    schedule: Schedule,
}

function ScheduleComponent(props: Props) {

    const s = props.schedule;

    const cancelAction : Action = {
        icon: cancelIcon,
        action: () => {},
    }

    const confirmAction : Action = {
        icon: confirmIcon,
        action: () => {},
    }

    const isWatering = isInBetweenDates(new Date(), s.startDate, s.endDate);

    function getBackgroundColor() {
        if(s.done) { //ERRADO
            return SUGGESTION_BACK_COLOR;
        } else if(isWatering) {
                return WATERING_BACK_COLOR;
        } else {
                return ITEM_BACK_COLOR;
        }
    }

    function getTopAction() {
        if(s.done) { //ERRADO
            return confirmAction
        } else if(isWatering) {
            return cancelAction;
        } else {
            return undefined;
        }
    }

    const background = { backgroundColor: getBackgroundColor() }

    function getTitle() {
        if(isWatering) {
            return "Now (Until " + getScheduleFormatted(s.endDate) + ")";
        } else {
            const dayDiff = dayDifference(new Date(), s.startDate);
            const hourDiff = hourDifference(s.startDate, s.endDate);

            function getPreamble() {
                if(dayDiff == 0) {
                    return "Today";
                } else if(dayDiff == 1) {
                    return "Tomorrow";
                } else {
                    return getScheduleFormatted(s.startDate);
                }
            }

            return getPreamble() + " at " + getHourFormatted(s.startDate) + " (Duration: " + hourDiff + "h)";
        }
    }

    return(
        <View style={[styles.outerView, background]}>
            <View style={styles.topTextView}>
                <Text style={styles.titleText}>{getTitle()}</Text>
            </View>
            <>
                {
                    getSpaceIfNoAction(getTopAction(), 10, ITEM_ICON_SIZE)
                }
            </>
        </View>
    )
}

const styles = StyleSheet.create({

    outerView: {
        borderColor: BORDER_COLOR,
        borderRadius: ITEM_RADIUS,
        borderWidth: 3,
        height: 50,
        margin: 10,
        flexDirection: "row",
        alignItems: "center"
    },

    topTextView: {
        width: "90%",
        paddingLeft: 5,
    },

    bottomTextView: {
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