import { StyleSheet, Text, View } from "react-native";
import { valueToDimension } from "../../utils";
import { Status, cropStatusToColor } from "../../utils/status";
import { TEXT_COLOR } from "../../utils/styles";

type Props = {
    status: string,
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