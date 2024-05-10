import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/titleBarComponent";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Action, GO_BACK_ICON } from "../../utils";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'CropPage'>;

function CropPage({navigation, route}: NavProps) {

    const crop = route.params;

    //const homeNav = useNavigation<homeStackProp>();

    /*return (
        <>
            <Text>Crop Page</Text>
            <Button
                onPress={() => homeNav.navigate(HOME_PAGE)}
                title="Go Back"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => homeNav.navigate(SYSTEM_PAGE)}
                title="To Systems"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Button
                onPress={() => homeNav.navigate(SCHEDULE_PAGE)}
                title="To Schedule"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </>
    );*/

    const leftAction : Action = {
        iconName: GO_BACK_ICON,
        action: () => navigation.goBack(),
    }

    return(
        <>
            <TitleBarComponent title={crop.name} leftAction={leftAction}/>
        </>
    );

}
  
export default CropPage;