import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Route from './src/routes'
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Provider as ReactProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './src/store';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

function App(): React.JSX.Element {

	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<ReactProvider store={store}>
				<NavigationContainer>
					<PersistGate persistor={persistor}>
						<Route/>
					</PersistGate>
				</NavigationContainer>
			</ReactProvider>
		</ApplicationProvider>
  	);
}

export default App;
