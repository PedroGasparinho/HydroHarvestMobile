import { StyleSheet, Text, View } from "react-native";
import { Action, BORDER_COLOR, Crop, ITEM_TITLE_SIZE, PROPERTY_ICON_SIZE, Property, TEXT_COLOR, getAverage, getPropertyIcon, reloadIcon, wateringCanIcon } from "../../utils";
import IconComponent from "../IconComponent";

type Props = {
    property: Property,
    value: number
}

function PropertyComponent(props: Props) {

    const reloadAction : Action = {
        icon: reloadIcon,
        action: () => {},
    }

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
        padding: 5,
    },

    borderView: {
        height: "100%",
        width: "100%",
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        justifyContent: "center",
        alignItems: "center",
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