import { StyleSheet, Text, View } from "react-native";
import IconComponent from "../IconComponent";
import { Property, getPropertyIcon } from "../../utils/property";
import { PROPERTY_ICON_SIZE } from "../../utils/icons";
import { BORDER_COLOR, ITEM_RADIUS, ITEM_BACK_COLOR, TEXT_COLOR, ITEM_TITLE_SIZE, BORDER_WIDTH } from "../../utils/styles";

type Props = {
    property: Property,
    value: number
}

function PropertyComponent(props: Props) {

    const v = props.value;
    const p = props.property;

    const title = "Average " + props.property.toString();
    const unit = p === Property.Temperature? "ºC" : "%";
    const displayValue = v.toFixed(1) + unit

    return(
        <View style={styles.outerView}>
            <View style={styles.borderView}>
                <View style={styles.topView}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.iconView}>
                    <IconComponent icon={getPropertyIcon(props.property)} width={100} size={PROPERTY_ICON_SIZE}/>
                </View>
                <View style={styles.valueView}>
                    <Text style={styles.propertyText}>{displayValue}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    outerView: {
        width: "50%",
        padding: 10,
    },

    borderView: {
        height: "100%",
        width: "100%",
        borderWidth: BORDER_WIDTH,
        borderColor: BORDER_COLOR,
        borderRadius: ITEM_RADIUS,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ITEM_BACK_COLOR,
    },

    topView: {
        height: "20%",
        justifyContent: "center",
    },

    iconView: {
        height: "60%",
        justifyContent: "center",
        alignItems: "center"
    },

    valueView: {
        height: "20%",
    },

    titleText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE,
        fontWeight: "bold"
    },

    propertyText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE,
        fontWeight: "bold",
    },

});

export default PropertyComponent;