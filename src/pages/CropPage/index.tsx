import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/TitleBarComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Action, Dimension } from "../../utils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import SystemComponent from "../../components/SystemComponent";
import StatusPanelComponent from "../../components/StatusPanelComponent";
import { goBackIcon, editIcon, addNewIcon } from "../../utils/icons";
import { PAGE_SUBTITLE_SIZE, TEXT_COLOR, ITEM_ICON_SIZE } from "../../utils/styles";
import { System } from "../../utils/domain";
import PopUpComponent from "../../components/PopUpComponent";
import AddSystemForm from "../../components/AddSystemFormComponent";
import SpaceComponent from "../../components/SpaceComponent";
import ActionWithIconComponent from "../../components/ActionWithIconComponent";
import { useState } from "react";
import EditNameFormComponent from "../../components/EditNameFormComponent";
import { changeName } from "../../utils/api";
import { useSelector } from "react-redux";
import { State } from "../../store";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'CropPage'>;

function CropPage({navigation, route}: NavProps) {

    const crop = route.params;

    const [systemFormVisible, setSystemFormVisible] = useState<boolean>(false); 
    const [nameFormVisible, setNameFormVisible] = useState<boolean>(false); 

    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }

    const rightAction : Action = {
        icon: editIcon,
        action: () => setNameFormVisible(true),
    }

    async function onNameChange(name: string) {
        if(loggedUser !== null) {
            const response = await changeName(crop, loggedUser, name);
            if(response.ok) {
                return "";
            } else {
                return response.status.toString();
            }
        } else {
            return "Not logged in";
        }
    }


    function getRightAction() {
        return rightAction; //crop.isWatering? rightAction : undefined; 
    }

    const addAction : Action = {
        icon: addNewIcon,
        action: () => setSystemFormVisible(true)
    }

    let i = 0;

    return(
        <>
            <TitleBarComponent title={crop.name} leftAction={leftAction} rightAction={getRightAction()}/>
            <StatusPanelComponent item={crop}/>
            <View style={styles.systemsTitleView}>
                <SpaceComponent value={15} dimension={Dimension.Width}/>
                <View style={styles.systemsTitleCenter}>
                    <Text style={styles.systemsTitleText}>List of systems</Text>
                </View>
                <ActionWithIconComponent action={addAction} size={ITEM_ICON_SIZE} width={15}/>
            </View>
            <ScrollView style={styles.systemsListView} contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <>
                    {
                        crop.systemsDetails.map((s: System) => 
                            <View key={i++} style={styles.systemsItemView}>
                                <SystemComponent system={s} crop={crop}/>
                            </View>
                        )
                    }
                </>
            </ScrollView>
            <PopUpComponent
                body={<AddSystemForm crop={crop} setModalVisible={setSystemFormVisible}/>}
                height={60}
                modalVisible={systemFormVisible}
                setModalVisible={setSystemFormVisible}
            />
            <PopUpComponent
                body={<EditNameFormComponent setModalVisible={setNameFormVisible} callback={onNameChange}/>}
                height={30}
                modalVisible={nameFormVisible}
                setModalVisible={setNameFormVisible}
            />
        </>
    );

}

const styles = StyleSheet.create({

    systemsTitleView: {
        height: "7.5%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    systemsTitleCenter: {
        height: "100%",
        width: "70%",
        display: "flex",
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

});
  
export default CropPage;