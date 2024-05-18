import { DimensionValue, StyleSheet, View } from "react-native";
import { ICON_RADIUS, Icon, valueToDimension } from "../../utils";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
    icon: Icon
    size: number,
    width: number,
}

function IconComponent(props: Props) {

    const icon = props.icon;
    const size = props.size;
    const width = {width: valueToDimension(props.width)};

    return(
        <View style={[styles.iconView, width]}>
            <View>
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

});

export default IconComponent;