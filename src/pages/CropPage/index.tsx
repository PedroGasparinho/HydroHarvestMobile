import { SCHEDULE_PAGE, homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/TitleBarComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ALT_TEXT_COLOR, Action, ITEM_RADIUS, ITEM_TITLE_SIZE, PAGE_SUBTITLE_SIZE, TEXT_COLOR, WATER_ICON_MAIN_COLOR, editIcon, goBackIcon, wateringCanIcon } from "../../utils";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SystemComponent from "../../components/SystemComponent";
import StatusPanelComponent from "../../components/StatusPanelComponent";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'CropPage'>;

function CropPage({navigation, route}: NavProps) {

    const crop = route.params;

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }

    const rightAction : Action = {
        icon: editIcon,
        action: () => {},
    }

    function getRightAction() {
        return crop.isWatering? rightAction : undefined; 
    }

    function goToSchedule() {
        navigation.navigate(SCHEDULE_PAGE, crop);
    }

    let i = 0;

    return(
        <>
            <TitleBarComponent title={crop.name} leftAction={leftAction} rightAction={getRightAction()}/>
            <StatusPanelComponent item={crop}/>
            <View style={styles.systemsTitleView}>
                <Text style={styles.systemsTitleText}>List of systems</Text>
            </View>
            <ScrollView style={styles.systemsListView} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <>
                    {
                        crop.systems.map(s => 
                            <View key={i++} style={styles.systemsItemView}>
                                <SystemComponent system={s}/>
                            </View>
                        )
                    }
                </>
            </ScrollView>
            <View style={styles.scheduleButtonView}>
                <TouchableOpacity style={styles.scheduleButtonStyle}>
                    <Text style={styles.scheduleButtonText} onPress={goToSchedule}>See schedule</Text>
                </TouchableOpacity>
            </View>
        </>
    );

}

const styles = StyleSheet.create({

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
        height: "30%",
    },

    systemsItemView: {
        width : '50%',
        flexDirection : "row"
    },

    scheduleButtonView: {
        height: "7.5%",
        padding: 10,
    },

    scheduleButtonStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: WATER_ICON_MAIN_COLOR,
        borderRadius: ITEM_RADIUS,
        justifyContent: "center",
        alignItems: "center",
    },

    scheduleButtonText: {
        color: ALT_TEXT_COLOR,
        fontSize: ITEM_TITLE_SIZE,
        fontWeight: "bold"
    }

});
  
export default CropPage;