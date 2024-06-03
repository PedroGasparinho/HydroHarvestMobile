import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StatusComponent from "../StatusComponent";
import ActionWithIconComponent from "../ActionWithIconComponent";
import PropertyComponent from "../PropertyComponent";
import { Action, Dimension} from "../../utils";
import SpaceComponent from "../SpaceComponent";
import { getLastReadFormatted } from "../../utils/date";
import { Crop, System, getLastCropUpdate } from "../../utils/domain";
import { reloadIcon } from "../../utils/icons";
import { Property, getPropertyAverage } from "../../utils/property";
import { getCropStatus } from "../../utils/status";
import { PAGE_SUBTITLE_SIZE, ITEM_ICON_SIZE, TEXT_COLOR, ITEM_TEXT_SIZE } from "../../utils/styles";

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
        return (item as Crop).crop !== undefined;
    }

    const isCrop = isCropFun(item); 

    const status = isCrop ? item.cropStatus : item.status;
    const humidity = isCrop ? getPropertyAverage(item, Property.Humidity) : item.humidityLevel;
    const tankLevel = isCrop ? getPropertyAverage(item, Property.TankLevel) : item.tankLevel;
    const temperature = isCrop ? getPropertyAverage(item, Property.Temperature) : item.temperatureLevel;
    const light = isCrop ? getPropertyAverage(item, Property.Light) : item.lightLevel;
    const lastUpdated = "Last Updated: " //+ getLastReadFormatted(isCrop ? getLastCropUpdate(item) : item.lastRead);

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
    },

});

export default StatusPanelComponent;