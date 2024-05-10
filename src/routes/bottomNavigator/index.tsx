import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import WeatherPage from '../../pages/WeatherPage';
import SettingsPage from '../../pages/SettingsPage';
import HomeStack from '../homeStack';
import { BOTTOM_BAR_ICON_SIZE, BOTTOM_BAR_FONT_SIZE, BOTTOM_BAR_ACTIVE_COLOR, BOTTOM_BAR_INACTIVE_COLOR } from '../../utils';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
	return (
    	<Tab.Navigator initialRouteName={"Home"} screenOptions={{
        	headerShown: false, 
        	tabBarActiveTintColor: BOTTOM_BAR_ACTIVE_COLOR,
        	tabBarInactiveTintColor: BOTTOM_BAR_INACTIVE_COLOR,
      	}}>
			<Tab.Screen name="Weather" component={WeatherPage} options={{
				tabBarIcon: ({ color }) => (
					<MCIcons name="sun-thermometer" color={color} size={BOTTOM_BAR_ICON_SIZE} />
				),
				tabBarLabelStyle: { fontSize: BOTTOM_BAR_FONT_SIZE }
			}} />
			<Tab.Screen name="Home" component={HomeStack} options={{
            	tabBarIcon: ({ color }) => (
              		<MCIcons name="sprout" color={color} size={BOTTOM_BAR_ICON_SIZE} />
            	),
				tabBarLabelStyle: { fontSize: BOTTOM_BAR_FONT_SIZE }
        	}} />
			<Tab.Screen name="Settings" component={SettingsPage} options={{
				tabBarIcon: ({ color }) => (
					<MCIcons name="cog" color={color} size={BOTTOM_BAR_ICON_SIZE} />
				),
				tabBarLabelStyle: { fontSize: BOTTOM_BAR_FONT_SIZE }
			}} />
      	</Tab.Navigator>
	);
}
  
export default BottomNavigator;