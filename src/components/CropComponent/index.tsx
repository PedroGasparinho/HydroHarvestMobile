import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BORDER_COLOR, Crop, DELETE_ICON_BACK_COLOR, DELETE_ICON_MAIN_COLOR, ICON_RADIUS, ITEM_ICON_SIZE, ITEM_BACK_COLOR, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR, WATER_ICON_BACK_COLOR, WATER_ICON_MAIN_COLOR, cropStatusToColor } from "../../utils";
import React from "react";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";

type Props = {
    crop: Crop
}

function CropComponent(prop: Props) {

    const crop = prop.crop;

    const notWateringElem = 
        <></>
    const isWateringElem =
        <TouchableOpacity style={styles.waterBackgroundView} onPress={onPressWater}>
            <MCIcons name="watering-can" color={WATER_ICON_MAIN_COLOR} size={ITEM_ICON_SIZE}/>
        </TouchableOpacity>

    const statusColor = cropStatusToColor(crop.status);

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

    return (
        <TouchableOpacity style={styles.outerView} onPress={onPressItem}>
            <View style={styles.topView}>
                <View style={styles.topLeftView}>
                    <>
                        {
                            crop.isWatering?isWateringElem:notWateringElem
                        }
                    </>
                </View>
                <View style={styles.topMiddleView}>
                    <Text style={styles.cropNameText}>{crop.name}</Text>
                    <Text style={styles.cropDistanceText}>{crop.distance + "m"}</Text>
                </View>
                <View style={styles.topRightView}>
                    <TouchableOpacity style={styles.deleteBackgroundView} onPress={onPressDelete}>
                        <MCIcons name="delete" color={DELETE_ICON_MAIN_COLOR} size={ITEM_ICON_SIZE}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.middleView}>
                <View style={styles.imageView}>
                    <Text>{"Image of " + crop.cropName}</Text>
                </View>
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.bottomText}>{"Crop status: "}</Text>
                <Text style={[styles.bottomText, {color: statusColor}]}>{crop.status}</Text>
            </View>
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

    topLeftView: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
    },

    waterBackgroundView: {
        backgroundColor: WATER_ICON_BACK_COLOR,
        borderRadius: ICON_RADIUS,
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

    topRightView: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
    },

    deleteBackgroundView: {
        backgroundColor: DELETE_ICON_BACK_COLOR,
        borderRadius: ICON_RADIUS,
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

    bottomView: {
        height: "15%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    bottomText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE,
    }

});
  
export default CropComponent;