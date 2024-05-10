import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from 'react';
import WeatherPage from '../../pages/WeatherPage';
import SettingsPage from '../../pages/SettingsPage';
import HomeStack from '../homeStack';

const Tab = createBottomTabNavigator();

function BottomNavigator() {
	return (
    	<Tab.Navigator initialRouteName={"Home"} screenOptions={{
        	headerShown: false, 
        	tabBarActiveTintColor: '#0A6847',
        	tabBarInactiveTintColor: '#000000',
      	}}>
			<Tab.Screen name="Weather" component={WeatherPage} options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcons name="sun-thermometer" color={color} size={size} />
				)
			}} />
			<Tab.Screen name="Home" component={HomeStack} options={{
            	tabBarIcon: ({ color, size }) => (
              		<MCIcons name="sprout" color={color} size={size} />
            	)
        	}} />
			<Tab.Screen name="Settings" component={SettingsPage} options={{
				tabBarIcon: ({ color, size }) => (
					<MCIcons name="cog" color={color} size={size} />
				)
			}} />
      	</Tab.Navigator>
	);
}
  
export default BottomNavigator;