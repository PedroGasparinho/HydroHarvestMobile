import { StyleSheet, Text, View } from "react-native";
import ActionWithIconComponent from "../ActionWithIconComponent";
import { Action, BORDER_COLOR, ITEM_ICON_SIZE, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, PROPERTY_ICON_SIZE, Property, TEXT_COLOR, getPropertyIcon, reloadIcon, wateringCanIcon } from "../../utils";
import IconComponent from "../IconComponent";

type Props = {
    property : Property,
}

function PropertyComponent(props: Props) {

    const reloadAction : Action = {
        icon: reloadIcon,
        action: () => {},
    }

    const title = "Average " + props.property.toString();

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
                    <Text style={styles.propertyText}>5%</Text>
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