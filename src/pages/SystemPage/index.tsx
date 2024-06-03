import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/TitleBarComponent";
import { Action, Dimension } from "../../utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import StatusPanelComponent from "../../components/StatusPanelComponent";
import { WATER_ICON_MAIN_COLOR, addNewIcon, editIcon, goBackIcon } from "../../utils/icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ALT_TEXT_COLOR, ITEM_ICON_SIZE, ITEM_RADIUS, ITEM_TITLE_SIZE, PAGE_SUBTITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import ScheduleComponent from "../../components/ScheduleComponent";
import { Schedule } from "../../utils/domain";
import SpaceComponent from "../../components/SpaceComponent";
import ActionWithIconComponent from "../../components/ActionWithIconComponent";
import { useEffect } from "react";
import { getWater, getWateringForecast, setStartWatering } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store";
import PopUpComponent from "../../components/PopUpComponent";
import AddScheduleForm from "../../components/AddScheduleFormComponent";
import { setVisible } from "../../store/modal.reducer";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'SystemPage'>;

function SystemPage({navigation, route}: NavProps) {

    const { crop, system } = route.params;
    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);
    const dispatcher = useDispatch();

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }

    async function birra(){
        console.log("BIRRA");
        const response = await setStartWatering();
        if(response.ok){
            console.log(await response.json());
        }else{
            console.log(response.status);
        }
    }

    const rightAction : Action = {
        icon: editIcon,
        action: async () => await birra(),
    }

    const addAction : Action = {
        icon: addNewIcon,
        action: () => dispatcher(setVisible(true))
    }

    useEffect(() =>  {
        /*async function getAll() {
            if(loggedUser !== null) {
                const response = await getAllCrops(loggedUser);
                console.log(response);
                if(response.ok) {
                    const crops = await response.json();
                    for(let i = 0; i < crops.crops.length; i++) {
                        if(crops.crops[i].systems === null) {
                            crops.crops[i].systems = []
                        }
                    }
                    setCrops(crops.crops);
                } else {
                    console.log("Error: " + response.status);
                }
            }
        }
        getAll();*/

        async function getSchedules() {
            if(loggedUser !== null) {
                const response = await getWater(crop, loggedUser, system);
                console.log(response);
                const schedules = await response.json();
                console.log(schedules);
                const res = await getWateringForecast(crop, loggedUser, system);
                console.log(res);
                const predictions = await res.json();
                console.log("Predictions: " + predictions);
            }
        }

        getSchedules();

    }, [])

    const schedules : Schedule[] = [
        {
            startDate: new Date("2024-06-03T10:0:00.000Z"),
            endDate: new Date("2024-06-03T11:00:00.000Z"),
            isSuggestion: false,
        },
        {
            startDate: new Date("2024-06-03T12:0:00.000Z"),
            endDate: new Date("2024-06-03T13:00:00.000Z"),
            isSuggestion: true,
        },
        {
            startDate: new Date("2024-06-03T15:0:00.000Z"),
            endDate: new Date("2024-06-03T16:00:00.000Z"),
            isSuggestion: false,
        }
    ];

    let i = 0;

    return (
        <>
            <TitleBarComponent leftAction={leftAction} title={system.name} rightAction={rightAction}/>
            <StatusPanelComponent item={system}/>
            <View style={styles.systemsTitleView}>
                <SpaceComponent value={15} dimension={Dimension.Width}/>
                <View style={styles.systemsTitleCenter}>
                    <Text style={styles.systemsTitleText}>List of watering schedules</Text>
                </View>
                <ActionWithIconComponent action={addAction} size={ITEM_ICON_SIZE} width={15}/>
            </View>
            <ScrollView style={styles.scrollView}>
            <>
                {
                    //schedules.sort(scheduleSortByDate).map(s => <ScheduleComponent key={i++} schedule={s}/>)
                    schedules.map(s => <ScheduleComponent key={i++} schedule={s}/>)
                }
            </>
            </ScrollView>
            <PopUpComponent
                body={<AddScheduleForm crop={crop}/>}
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

    scrollView: {
        height: "37.5%",
    },

});
  
export default SystemPage;