import { DimensionValue, StyleSheet, TouchableOpacity, View } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Action, ICON_RADIUS } from "../../utils";

type Props = {
    action?: Action,
    size?: number,
    width: string,
}

function ActionWithIconComponent(props: Props) {

    const action = props.action?.action;
    const icon = props.action?.icon;
    const size = props.size;
    const width = {width: props.width as DimensionValue};
    const background = {backgroundColor: icon?.backgroundColor}

    function displayIcon() {
        if(action === undefined || icon === undefined || size == undefined) {
            return(<></>)
        } else {
            return(
                <TouchableOpacity style={[styles.iconRadius, background]} onPress={action}>
                    <MCIcons name={icon.name} color={icon.color} size={size}/>
                </TouchableOpacity>
            )
        }
    }

    return(
        <View style={[styles.iconView, width]}>
            <>{displayIcon()}</>
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