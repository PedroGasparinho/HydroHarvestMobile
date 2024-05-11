import { StyleSheet, TouchableOpacity, View } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Action, ICON_RADIUS, valueToDimension } from "../../utils";

type Props = {
    action: Action,
    size: number,
    width: number,
}

function ActionWithIconComponent(props: Props) {

    const action = props.action.action;
    const icon = props.action.icon;
    const size = props.size;
    const width = {width: valueToDimension(props.width)};
    const background = {backgroundColor: icon.backgroundColor}

    return(
        <View style={[styles.iconView, width]}>
            <TouchableOpacity style={[styles.iconRadius, background]} onPress={action}>
                <MCIcons name={icon.name} color={icon.color} size={size}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    iconView: {
        justifyContent: "center",
        alignItems: "center",
    },

    iconRadius: {
        borderRadius: ICON_RADIUS,
    },

});

export default ActionWithIconComponent;