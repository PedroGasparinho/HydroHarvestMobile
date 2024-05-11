import { DimensionValue, StyleSheet, View } from "react-native";
import { ICON_RADIUS, Icon } from "../../utils";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
    icon: Icon
    size: number,
    width: string,
}

function IconComponent(props: Props) {

    const icon = props.icon;
    const size = props.size;
    const width = {width: props.width as DimensionValue};
    //const background = {backgroundColor: icon.backgroundColor}

    return(
        <View style={[styles.iconView, width]}>
            <View /*style={[styles.iconRadius]}*/>
                <MCIcons name={icon.name} color={icon.color} size={size}/>
            </View>
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