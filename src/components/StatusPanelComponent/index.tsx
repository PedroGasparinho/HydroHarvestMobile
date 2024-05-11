import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatusComponent from "../StatusComponent";
import ActionWithIconComponent from "../ActionWithIconComponent";
import PropertyComponent from "../PropertyComponent";
import { Action, Crop, Dimension, ITEM_ICON_SIZE, ITEM_TEXT_SIZE, PAGE_SUBTITLE_SIZE, Property, System, TEXT_COLOR, getAverage, getCropStatus, getLastCropUpdate, reloadIcon } from "../../utils";
import SpaceComponent from "../SpaceComponent";

type Props = {
    item: Crop | System,
}

function StatusPanelComponent(props: Props) {

    const item = props.item;

    const reloadAction : Action = {
        icon: reloadIcon,
        action: () => {},
    }

    function isCropFun(item: Crop | System): item is Crop {
        return (item as Crop).cropName !== undefined;
    }

    const isCrop = isCropFun(item); 

    const status = isCrop ? getCropStatus(item) : item.status;
    const humidity = isCrop ? getAverage(item, Property.Humidity) : item.humidity;
    const tankLevel = isCrop ? getAverage(item, Property.TankLevel) : item.tankLevel;
    const temperature = isCrop ? getAverage(item, Property.Temperature) : item.temperature;
    const light = isCrop ? getAverage(item, Property.Light) : item.light;
    const lastUpdated = "Last Updated: " + (isCrop ? getLastCropUpdate(item) : item.lastRead).toLocaleString();

    return(
        <View style={styles.statusView}>
            <View style={styles.statusTopView}>
                <SpaceComponent value={10} dimension={Dimension.Width}/>
                <View style={styles.statusTitleView}>
                    <StatusComponent status={status} fontSize={PAGE_SUBTITLE_SIZE} height={60} isCrop={isCrop}/>
                    <View style={styles.statusLastReadView}>
                        <Text style={styles.statusLastReadText}>{lastUpdated}</Text>
                    </View>
                </View>
                <ActionWithIconComponent action={reloadAction} width={10} size={ITEM_ICON_SIZE}/>
            </View>
            <View style={styles.statusBottomView}>
                <View style={styles.propertyView}>
                    <PropertyComponent value={humidity} property={Property.Humidity}/>
                    <PropertyComponent value={tankLevel} property={Property.TankLevel}/>
                </View>
                <View style={styles.propertyView}>
                    <PropertyComponent value={temperature} property={Property.Temperature}/>
                    <PropertyComponent value={light} property={Property.Light}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    statusView: {
        height: "45%",
    },

    statusTopView: {
        height: "15%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    statusLastReadView: {
        height: "40%",
    },

    statusLastReadText: {
        color: TEXT_COLOR,
        fontSize: ITEM_TEXT_SIZE,
    },

    statusTitleView: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },

    statusBottomView: {
        height: "85%",
    },

    propertyView: {
        height: "50%",
        flexDirection: "row",
        paddingHorizontal: 5,
    },

});

export default StatusPanelComponent;