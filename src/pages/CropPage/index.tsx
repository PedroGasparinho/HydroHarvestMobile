import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/titleBarComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Action, ICON_MAIN_COLOR, ITEM_ICON_SIZE, ITEM_TEXT_SIZE, goBackIcon } from "../../utils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StatusComponent from "../../components/StatusComponent";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'CropPage'>;

function CropPage({navigation, route}: NavProps) {

    const crop = route.params;

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }

    return(
        <>
            <TitleBarComponent title={crop.name} leftAction={leftAction}/>
            <View style={styles.statusView}>
                <View style={styles.statusTopView}>
                    <View style={styles.statusIconView}>
                        <></>
                    </View>
                    <View style={styles.statusTitleView}>
                        <StatusComponent cropStatus={crop.status} fontSize={ITEM_TEXT_SIZE} height="100%"/>
                    </View>
                    <View style={styles.statusIconView}>
                        <MCIcons name="reload" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                    </View>
                </View>
                <View style={styles.statusBottomView}>
                    <View>
                        <Text>Average Humidity</Text>
                        <Text>(5 mins ago)</Text>
                        <MCIcons name="water" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <MCIcons name="reload" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <Text>5%</Text>
                    </View>
                    <View>
                        <Text>Average Humidity</Text>
                        <Text>(5 mins ago)</Text>
                        <MCIcons name="water" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <MCIcons name="reload" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <Text>5%</Text>
                    </View>
                    <View>
                        <Text>Average Humidity</Text>
                        <Text>(5 mins ago)</Text>
                        <MCIcons name="water" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <MCIcons name="reload" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <Text>5%</Text>
                    </View>
                    <View>
                        <Text>Average Humidity</Text>
                        <Text>(5 mins ago)</Text>
                        <MCIcons name="water" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <MCIcons name="reload" color={ICON_MAIN_COLOR} size={ITEM_ICON_SIZE} />
                        <Text>5%</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.systemsView}>
                <Text>AAA</Text>
            </ScrollView>
        </>
    );

}

const styles = StyleSheet.create({

    statusView: {
        height: "40%",
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
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
    },

    statusBottomView: {
        height: "85%",
        backgroundColor: "#ff0000",
        flexDirection: "row",
    },

    systemsView: {
        height: "50%",
        backgroundColor: "#ffff00",
    }

});
  
export default CropPage;