import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/TitleBarComponent";
import { Action, Schedule, addNewIcon, goBackIcon, scheduleSortByDate } from "../../utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet } from "react-native";
import ScheduleComponent from "../../components/ScheduleComponent";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'SchedulePage'>;

function SchedulePage({navigation, route}: NavProps) {

    const crop = route.params;

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }

    const rightAction : Action = {
        icon: addNewIcon,
        action: () => {},
    }

    const s1 : Schedule = {
        startDate: new Date("2024-05-13T22:00:00.000+01:00"),
        endDate: new Date("2024-05-13T23:00:00.000+01:00"),
        isSuggestion: false,
        systems: []
    }

    const s2 : Schedule = {
        startDate: new Date("2024-05-12T18:00:00.000+01:00"),
        endDate: new Date("2024-05-12T19:00:00.000+01:00"),
        isSuggestion: true,
        systems: []
    }

    const s3 : Schedule = {
        startDate: new Date("2024-05-12T22:00:00.000+01:00"),
        endDate: new Date("2024-05-12T23:00:00.000+01:00"),
        isSuggestion: false,
        systems: []
    }

    const schedules = [s1, s2, s3];

    let i = 0;

    return (
        <>
            <TitleBarComponent title={crop.name} subtitle="Schedule" leftAction={leftAction} rightAction={rightAction}/>
            <ScrollView style={styles.scrollView}>
            <>
                {
                    schedules.sort(scheduleSortByDate).map(s => <ScheduleComponent key={i++} schedule={s}/>)
                }
            </>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({

    scrollView: {
        height: "90%",
    }

});
  
export default SchedulePage;