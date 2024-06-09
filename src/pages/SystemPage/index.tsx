import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/TitleBarComponent";
import { Action, Dimension } from "../../utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import StatusPanelComponent from "../../components/StatusPanelComponent";
import { addNewIcon, editIcon, goBackIcon } from "../../utils/icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ITEM_ICON_SIZE, PAGE_SUBTITLE_SIZE, TEXT_COLOR } from "../../utils/styles";
import ScheduleComponent from "../../components/ScheduleComponent";
import { Schedule, ScheduleDTO, scheduleSortByDate } from "../../utils/domain";
import SpaceComponent from "../../components/SpaceComponent";
import ActionWithIconComponent from "../../components/ActionWithIconComponent";
import { useEffect, useState } from "react";
import { changeSystemName, getWater, getWateringForecast } from "../../utils/api";
import { useSelector } from "react-redux";
import { State } from "../../store";
import PopUpComponent from "../../components/PopUpComponent";
import AddScheduleForm from "../../components/AddScheduleFormComponent";
import EditNameFormComponent from "../../components/EditNameFormComponent";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'SystemPage'>;

function SystemPage({navigation, route}: NavProps) {

    const { crop, system } = route.params;
    const loggedUser = useSelector((state: State) => state.persistedReducer.userReducer.user);

    const [schedules, SetSchedules] = useState<Schedule[]>([]);
    const [scheduleFormVisible, setScheduleFormVisible] = useState<boolean>(false); 
    const [nameFormVisible, setNameFormVisible] = useState<boolean>(false); 
   
    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }


    async function onNameChange(name: string) {
        if(loggedUser !== null) {
            const response = await changeSystemName(crop, loggedUser, system, name);
            if(response.ok) {
                return "";
            } else {
                return response.status.toString();
            }
        } else {
            return "Not logged in";
        }
    }

    const rightAction : Action = {
        icon: editIcon,
        action: async () => setNameFormVisible(true),
    }

    const addAction : Action = {
        icon: addNewIcon,
        action: () => setScheduleFormVisible(true)
    }

    useEffect(() =>  {
        async function getSchedules() {
            if(loggedUser !== null) {
                const response = await getWater(crop, loggedUser, system);
                const sch = await response.json();
                SetSchedules(sch.map((s: ScheduleDTO) => {
                    return { startDate: new Date(s.startDate), endDate: new Date(s.endDate), done: s.done, isSuggestion: false };
                }));
            }
        }
        getSchedules();
    }, [])

    useEffect(() => {
        async function getPrediction() {
            if(loggedUser !== null) {
                const res = await getWateringForecast(crop, loggedUser, system);
                if(res.ok) {
                    const p = await res.json();
                    console.log(p);
                    if(p.start !== null && p.end !== null) {
                        const newSchedules = [...schedules, { 
                            startDate: new Date(p.start), 
                            endDate: new Date(p.end), 
                            done: false,
                            isSuggestion: true
                        }]
                        SetSchedules(newSchedules);
                    }
                } else {
                    console.log("Error: " + res.status);
                }
            }
        }
        getPrediction();
    }, [])

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
                    schedules
                        .filter(s => {
                            const now = new Date();
                            return s.endDate.getTime() > now.getTime();
                        })
                        .sort(scheduleSortByDate)
                        .map(s => <ScheduleComponent key={i++} schedule={s} crop={crop} system={system}/>)
                }
            </>
            </ScrollView>
            <PopUpComponent
                body={<AddScheduleForm crop={crop} system={system} setModalVisible={setScheduleFormVisible}/>}
                height={60}
                modalVisible={scheduleFormVisible}
                setModalVisible={setScheduleFormVisible}
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

    scrollView: {
        height: "37.5%",
    },

});
  
export default SystemPage;