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
                    <View style={styles.topTitleView}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <ActionWithIconComponent action={reloadAction} width="15%" size={ITEM_ICON_SIZE}/>
                </View>
                <View style={styles.iconView}>
                    <IconComponent icon={getPropertyIcon(props.property)} width="100%" size={PROPERTY_ICON_SIZE}/>
                </View>
                <View style={styles.valueView}>
                    <Text style={styles.propertyText}>5%</Text>
                </View>
                <View style={styles.lastReadView}>
                    <Text style={styles.propertyText}>(5 mins ago)</Text>
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
        flexDirection: "row",
    },

    topTitleView: {
        width: "85%",
        justifyContent: "center",
    },

    iconView: {
        height: "50%",
        justifyContent: "center",
        alignItems: "center"
    },

    valueView: {
        height: "15%",
    },

    lastReadView: {
        height: "15%",
    },

    titleText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE,
        fontWeight: "bold",
        paddingLeft: 5,
    },

    propertyText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE,
    },

});

export default PropertyComponent;