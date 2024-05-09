import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../../pages/LoginPage';
import BottomNavigator from '../bottomNavigator';

const Stack = createNativeStackNavigator();

export const LOGIN_SCREEN = "LoginPage";
export const APP_SCREEN = "BottomNavigator";

export type mainNavigationStackProp = {
    LoginPage: undefined,
    BottomNavigator: undefined
}

export type mainStackProp = NativeStackNavigationProp<mainNavigationStackProp>;   

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginPage} />
      <Stack.Screen name={APP_SCREEN} component={BottomNavigator} />
    </Stack.Navigator>
  );
}

export default MainStack;