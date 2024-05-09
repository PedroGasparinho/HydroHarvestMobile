import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import WeatherPage from '../../pages/WeatherPage';
import SettingsPage from '../../pages/SettingsPage';
import HomeStack from '../homeStack';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
	return (
    	<Tab.Navigator initialRouteName={"List"} screenOptions={{
        	headerShown: false, 
        	tabBarActiveTintColor: '#0F1A91',
        	tabBarInactiveTintColor: '#000000',
      	}} >
        	<Tab.Screen name="HomeStack" component={HomeStack} options={{
            	tabBarIcon: ({ color, size }) => (
              		<MCIcons name="sprout" color={color} size={size} />
            	)
        	}} />
			<Tab.Screen name="WeatherPage" component={WeatherPage} options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcons name="sun-thermometer" color={color} size={size} />
				)
			}} />
			<Tab.Screen name="SettingsPage" component={SettingsPage} options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcons name="cog" color={color} size={size} />
				)
			}} />
      	</Tab.Navigator>
	);
}
  
export default BottomNavigator;