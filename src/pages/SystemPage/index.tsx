import { homeNavigationStackProp } from "../../routes/homeStack";
import TitleBarComponent from "../../components/TitleBarComponent";
import { Action, editIcon, goBackIcon } from "../../utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import StatusPanelComponent from "../../components/StatusPanelComponent";

type NavProps = NativeStackScreenProps<homeNavigationStackProp, 'SystemPage'>;

function SystemPage({navigation, route}: NavProps) {

    const system = route.params;

    const leftAction : Action = {
        icon: goBackIcon,
        action: () => navigation.goBack(),
    }

    const rightAction : Action = {
        icon: editIcon,
        action: () => {},
    }

    return (
        <>
            <TitleBarComponent leftAction={leftAction} title={system.name} rightAction={rightAction}/>
            <StatusPanelComponent item={system}/>
        </>
    );
  }
  
  export default SystemPage;