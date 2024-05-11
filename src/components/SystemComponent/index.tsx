import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BORDER_COLOR, ITEM_BACK_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, System, TEXT_COLOR } from "../../utils";
import { useNavigation } from "@react-navigation/native";
import { SYSTEM_PAGE, homeStackProp } from "../../routes/homeStack";

type Props = {
    system: System
}

function SystemComponent(props: Props) {

    const homeNav = useNavigation<homeStackProp>();

    const s = props.system;

    function onPressItem() {
        homeNav.navigate(SYSTEM_PAGE, s);
    }

    return(
        <View style={styles.outerView}>
            <TouchableOpacity style={styles.innerView} onPress={onPressItem}>
                <Text style={styles.textStyle}>{s.name + " - "}</Text>
                <Text style={styles.textStyle}>{s.type}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
    outerView: {
        height: 60,
        padding: 10,
    },

    innerView: {
        flexDirection: "row",
        borderWidth: 2,
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