import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/titleBarComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Action, ITEM_ICON_SIZE, PAGE_SUBTITLE_SIZE, Property, TEXT_COLOR, goBackIcon, reloadIcon, wateringCanIcon } from "../../utils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StatusComponent from "../../components/StatusComponent";
import ActionWithIconComponent from "../../components/ActionWithIconComponent";
import PropertyComponent from "../../components/PropertyComponent";
import SystemComponent from "../../components/SystemComponent";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'CropPage'>;

function CropPage({navigation, route}: NavProps) {

    const crop = route.params;

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }

    const rightAction : Action = {
        icon: wateringCanIcon,
        action: () => navigation.goBack(),
    }

    const reloadAction : Action = {
        icon: reloadIcon,
        action: () => {},
    }

    function getRightAction() {
        return crop.isWatering? rightAction : undefined; 
    }

    return(
        <>
            <TitleBarComponent title={crop.name} leftAction={leftAction} rightAction={getRightAction()}/>
            <View style={styles.statusView}>
                <View style={styles.statusTopView}>
                    <ActionWithIconComponent width={"10%"}/>
                    <View style={styles.statusTitleView}>
                        <StatusComponent cropStatus={crop.status} fontSize={PAGE_SUBTITLE_SIZE} height="100%"/>
                    </View>
                    <ActionWithIconComponent action={reloadAction} width={"10%"} size={ITEM_ICON_SIZE}/>
                </View>
                <View style={styles.statusBottomView}>
                    <View style={styles.propertyView}>
                        <PropertyComponent property={Property.Humidity}/>
                        <PropertyComponent property={Property.TankLevel}/>
                    </View>
                    <View style={styles.propertyView}>
                        <PropertyComponent property={Property.Temperature}/>
                        <PropertyComponent property={Property.Light}/>
                    </View>
                </View>
            </View>
            <View style={styles.systemsTitleView}>
                <Text style={styles.systemsTitleText}>List of systems</Text>
            </View>
            <ScrollView style={styles.systemsListView}>
                <SystemComponent/>
                <SystemComponent/>
                <SystemComponent/>
                <SystemComponent/>
                <SystemComponent/>
                <SystemComponent/>
                <SystemComponent/>
                <SystemComponent/>
            </ScrollView>
        </>
    );

}

const styles = StyleSheet.create({

    statusView: {
        height: "45%",
    },

    statusTopView: {
        height: "15%",
        flexDirection: "row",
    },

    statusIconView: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
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

    systemsTitleView: {
        height: "7.5%",
        justifyContent: "center",
        alignItems: "center",
    },

    systemsTitleText: {
        fontSize: PAGE_SUBTITLE_SIZE,
        color: TEXT_COLOR
    },

    systemsListView: {
        height: "37.5%",
    }

});
  
export default CropPage;