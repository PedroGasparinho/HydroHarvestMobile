import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { TEXT_COLOR, cropStatusToColor, valueToDimension } from "../../utils";

type Props = {
    cropStatus: string,
    fontSize: number,
    height: number,
}

function StatusComponent(props: Props) {

    const status = props.cropStatus;
    const height = {height: valueToDimension(props.height)};
    const statusColor = {color: cropStatusToColor(status)};
    const textSize = {fontSize: props.fontSize}

    return(
        <View style={[styles.outerView, height]}>
            <Text style={[styles.textColor, textSize]}>{"Crop status: "}</Text>
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