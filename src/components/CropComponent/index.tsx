import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BORDER_COLOR, Crop, ITEM_ICON_SIZE, ITEM_BACK_COLOR, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR, wateringCanIcon, deleteIcon, Action, getSpaceIfNoAction, getCropStatus } from "../../utils";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";
import StatusComponent from "../StatusComponent";
import ActionWithIconComponent from "../ActionWithIconComponent";

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
        //TODO
    }

    function onPressDelete() {
        //TODO
    }

    const wateringAction : Action = {
        icon: wateringCanIcon,
        action: onPressWater,
    }

    const deleteAction : Action = {
        icon: deleteIcon,
        action: onPressDelete,
    }

    function getWateringAction() {
        return crop.isWatering? wateringAction : undefined; 
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
                    <Text style={styles.cropDistanceText}>{crop.distance + "m"}</Text>
                </View>
                <ActionWithIconComponent action={deleteAction} width={15} size={ITEM_ICON_SIZE}/>
            </View>
            <View style={styles.middleView}>
                <View style={styles.imageView}>
                    <Text>{"Image of " + crop.cropName}</Text>
                </View>
            </View>
            <StatusComponent status={getCropStatus(crop)} fontSize={ITEM_TEXT_SIZE} height={15} isCrop={true}/>
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
    },

});
  
export default CropComponent;