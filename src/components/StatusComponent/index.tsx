import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { Status, TEXT_COLOR, cropStatusToColor, valueToDimension } from "../../utils";

type Props = {
    status: Status,
    fontSize: number,
    height: number,
    isCrop: boolean,
}

function StatusComponent(props: Props) {

    const status = props.status;
    const height = {height: valueToDimension(props.height)};
    const statusColor = {color: cropStatusToColor(status)};
    const textSize = {fontSize: props.fontSize}

    const preamble = (props.isCrop? "Crop" : "System") + " status: ";

    return(
        <View style={[styles.outerView, height]}>
            <Text style={[styles.textColor, textSize]}>{preamble}</Text>
            <Text style={[statusColor, textSize]}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    outerView: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    textColor: {
        color: TEXT_COLOR,
    }

});

export default StatusComponent;