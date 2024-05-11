import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../../pages/HomePage';
import CropPage from '../../pages/CropPage';
import SystemPage from '../../pages/SystemPage';
import SchedulePage from '../../pages/SchedulePage';
import { Crop, System } from '../../utils';

const Stack = createNativeStackNavigator();

export const HOME_PAGE = "HomePage";
export const CROP_PAGE = "CropPage";
export const SYSTEM_PAGE = "SystemPage";
export const SCHEDULE_PAGE = "SchedulePage";

export type homeNavigationStackProp = {
    HomePage: undefined,
    CropPage: Crop,
    SystemPage: System,
    SchedulePage: undefined
  }

export type homeStackProp = NativeStackNavigationProp<homeNavigationStackProp>;   

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={HOME_PAGE} component={HomePage} />
      <Stack.Screen name={CROP_PAGE} component={CropPage} />
      <Stack.Screen name={SYSTEM_PAGE} component={SystemPage} />
      <Stack.Screen name={SCHEDULE_PAGE} component={SchedulePage}/>
    </Stack.Navigator>
  );
}

export default HomeStack;