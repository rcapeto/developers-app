import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Poppins_400Regular, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

import { LoadingPage } from '~/components/LoadingPage';
import { Compose } from '~/components/Compose';
import Routes from '~/routes';
import { client } from '~/config/react-query';

import { AccountContextProvider } from '~/contexts/account/AccountContext';
import { AppNavigationProvider } from '~/contexts/app-navigation/AppNavigationContext';
import { EventContextProvider } from '~/contexts/events/EventContext';

export default function App() {
	const [isFontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold
	});

	if(!isFontsLoaded) {
		return <LoadingPage />;
	}

	const contexts = [
		EventContextProvider,
		AppNavigationProvider,
		AccountContextProvider
	];

	return (
		<RootSiblingParent>
			<QueryClientProvider client={client}>
				<NavigationContainer>
					<Compose contexts={contexts}>
						<StatusBar style="light" />
						<Routes />
					</Compose>
				</NavigationContainer>
			</QueryClientProvider>
		</RootSiblingParent>
	);
}