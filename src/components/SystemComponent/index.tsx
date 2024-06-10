import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SYSTEM_PAGE, homeStackProp } from "../../routes/homeStack";
import { Crop, System } from "../../utils/domain";
import { BORDER_COLOR, ITEM_BACK_COLOR, ITEM_RADIUS, TEXT_COLOR, ITEM_TEXT_SIZE, BORDER_WIDTH } from "../../utils/styles";
import { distBetweenEarthPoints } from "../../utils/regions";
import { useSelector } from "react-redux";
import { State } from "../../store";

type Props = {
    crop: Crop,
    system: System
    setDirty: React.Dispatch<React.SetStateAction<boolean>>
}

function SystemComponent(props: Props) {

    const homeNav = useNavigation<homeStackProp>();

    const s = props.system;

    const loc = useSelector((state: State) => state.persistedReducer.locationReducer.location);

    function onPressItem() {
        homeNav.navigate(SYSTEM_PAGE, {crop: props.crop, system: props.system, setDirty: props.setDirty});
    }

    return(
        <View style={styles.outerView}>
            <TouchableOpacity style={styles.innerView} onPress={onPressItem}>
                <Text style={styles.textStyle}>{s.name + " - "}</Text>
                <Text style={styles.textStyle}>{distBetweenEarthPoints(loc.lat, loc.lon, s.latitude, s.longitude).toFixed(2) + " km"}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
    outerView: {
        height: 60,
        padding: 10,
        width: "100%"
    },

    innerView: {
        flexDirection: "row",
        borderWidth: BORDER_WIDTH,
        borderColor: BORDER_COLOR,
        backgroundColor: ITEM_BACK_COLOR,
        borderRadius: ITEM_RADIUS,
        height: "100%",
        alignItems: "center",
        paddingLeft: 10,
    },

    textStyle: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE
    }

});

export default SystemComponent;