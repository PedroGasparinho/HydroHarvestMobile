import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BORDER_COLOR, ITEM_BACK_COLOR, ITEM_TEXT_SIZE, TEXT_COLOR } from "../../utils";

function SystemComponent() {
    return(
        <View style={styles.outerView}>
            <TouchableOpacity style={styles.innerView} onPress={() => {}}>
                <Text style={styles.textStyle}>Center System: </Text>
                <Text style={styles.textStyle}>ESP32-Wrover</Text>
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