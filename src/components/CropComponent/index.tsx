import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CROP_PAGE, homeStackProp } from "../../routes/homeStack";
import StatusComponent from "../StatusComponent";
import { Crop } from "../../utils/domain";
import { BORDER_COLOR, BORDER_WIDTH, ITEM_BACK_COLOR, ITEM_RADIUS, ITEM_TEXT_SIZE, ITEM_TITLE_SIZE, TEXT_COLOR } from "../../utils/styles";

type Props = {
    crop: Crop
}

function CropComponent(prop: Props) {

    const crop = prop.crop;

    const homeNav = useNavigation<homeStackProp>();

    function onPressItem() {
        homeNav.navigate(CROP_PAGE, crop);
    }

    function getLocationText() {
        if(crop.systemsDetails.length == 0) {
            return crop.location;
        } else {
            return crop.location + " (" + crop.averageDistance.toFixed(2) + " km)"
        }
    }

    return (
        <View style={styles.outerView}>
            <TouchableOpacity style={styles.innerView} onPress={onPressItem}>
                <View style={styles.topView}>
                    <Text style={styles.cropNameText}>{crop.name}</Text>
                    <Text style={styles.cropDistanceText}>{getLocationText()}</Text>
                </View>
                <View style={styles.middleView}>
                    <View style={styles.imageView}>
                        <Text>{"Image of " + crop.crop}</Text>
                    </View>
                </View>
                <StatusComponent status={crop.cropStatus} fontSize={ITEM_TEXT_SIZE} height={15} isCrop={true}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    
    outerView: {
        height: 200,
        padding: 10,
        width: "100%",
    },

    innerView: {
        borderColor: BORDER_COLOR,
        borderWidth: BORDER_WIDTH,
        backgroundColor: ITEM_BACK_COLOR,
        borderRadius: ITEM_RADIUS,
    },

    topView: {
        height: "30%",
        width: "100%",
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
        borderWidth: BORDER_WIDTH,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ITEM_RADIUS,
    },

});
  
export default CropComponent;