import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Route from './src/routes'

function App(): React.JSX.Element {

	return (
		<NavigationContainer>
    		<Route/>
    	</NavigationContainer>
  	);
}

export default App;
