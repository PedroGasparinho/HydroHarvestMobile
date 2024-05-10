import { DimensionValue, StyleSheet, TouchableOpacity, View } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Icon, ICON_BACK_COLOR, ICON_RADIUS } from "../../utils";

type Props = {
    icon?: Icon,
    action?: (() => void),
    width: string,
    size: number, 
}

function IconComponent(props: Props) {

    const icon = props.icon
    const action = props.action;
    const width = {width: props.width as DimensionValue};
    const background = {backgroundColor: icon?.backgroundColor}

    function displayIcon() {
        if(icon === undefined) {
            return(<></>)
        } else if(action === undefined) {
            return(
                <View style={[styles.iconRadius, background]}>
                    <MCIcons name={icon.name} color={icon.color} size={props.size}/>
                </View>
            )
        } else {
            return(
                <TouchableOpacity style={[styles.iconRadius, background]} onPress={props.action}>
                    <MCIcons name={icon.name} color={icon.color} size={props.size}/>
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

export default IconComponent;