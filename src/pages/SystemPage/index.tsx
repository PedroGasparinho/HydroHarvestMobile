import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/TitleBarComponent";
import { Action, goBackIcon } from "../../utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import StatusPanelComponent from "../../components/StatusPanelComponent";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'SystemPage'>;

function SystemPage({navigation, route}: NavProps) {

    const system = route.params;

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }


    return (
        <>
            <TitleBarComponent leftAction={leftAction} title={system.name}/>
            <StatusPanelComponent item={system}/>
        </>
    );
  }
  
  export default SystemPage;