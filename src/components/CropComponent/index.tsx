import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Action, Dimension, getSpaceIfNoAction } from "../../utils";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";
import StatusComponent from "../StatusComponent";
import ActionWithIconComponent from "../ActionWithIconComponent";
import { Crop } from "../../utils/domain";
import { deleteIcon, wateringCanIcon } from "../../utils/icons";
import { BORDER_COLOR, ITEM_BACK_COLOR, ITEM_ICON_SIZE, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import SpaceComponent from "../SpaceComponent";

type Props = {
    crop: Crop
}

function CropComponent(prop: Props) {

    const crop = prop.crop;

    const homeNav = useNavigation<homeStackProp>();

    function onPressItem() {
        homeNav.navigate(CROP_PAGE, crop);
    }

    function onPressWater() {
        //homeNav.navigate(SCHEDULE_PAGE, crop);
    }

    const wateringAction : Action = {
        icon: wateringCanIcon,
        action: onPressWater,
    }

    function getWateringAction() {
        return undefined;
    }

    return (
        <TouchableOpacity style={styles.outerView} onPress={onPressItem}>
            <View style={styles.topView}>
                <>
                    {
                        getSpaceIfNoAction(getWateringAction(), 15, ITEM_ICON_SIZE)
                    }
                </>
                <View style={styles.topMiddleView}>
                    <Text style={styles.cropNameText}>{crop.name}</Text>
                    <Text style={styles.cropDistanceText}>{crop.location}</Text>
                </View>
                <SpaceComponent value={15} dimension={Dimension.Width}/>
            </View>
            <View style={styles.middleView}>
                <View style={styles.imageView}>
                    <Text>{"Image of " + crop.crop}</Text>
                </View>
            </View>
            <StatusComponent status={crop.cropStatus} fontSize={ITEM_TEXT_SIZE} height={15} isCrop={true}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
    outerView: {
        borderColor: BORDER_COLOR,
        borderWidth: 3,
        height: 200,
        margin: 10,
        backgroundColor: ITEM_BACK_COLOR,
        borderRadius: ITEM_RADIUS,
    },

    topView: {
        height: "30%",
        flexDirection: "row"
    },

    topMiddleView: {
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
    },

    cropNameText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE,
        fontWeight: "bold",
    },

    cropDistanceText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE,
    },

    middleView: {
        height: "55%",
        justifyContent: "center",
        alignItems: "center",
    },

    imageView: {
        height: "90%",
        width: "60%",
        borderColor: BORDER_COLOR,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ITEM_RADIUS,
    },

});
  
export default CropComponent;