import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/titleBarComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Action, PAGE_SUBTITLE_SIZE, TEXT_COLOR, goBackIcon, reloadIcon, wateringCanIcon } from "../../utils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
        icon: wateringCanIcon,
        action: () => navigation.goBack(),
    }

    function getRightAction() {
        return crop.isWatering? rightAction : undefined; 
    }

    let i = 0;

    return(
        <>
            <TitleBarComponent title={crop.name} leftAction={leftAction} rightAction={getRightAction()}/>
            <StatusPanelComponent item={crop}/>
            <View style={styles.systemsTitleView}>
                <Text style={styles.systemsTitleText}>List of systems</Text>
            </View>
            <ScrollView style={styles.systemsListView}>
                <>
                    {
                        crop.systems.map(s => <SystemComponent key={i++} system={s}/>)
                    }
                </>
            </ScrollView>
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
        height: "37.5%",
    }

});
  
export default CropPage;