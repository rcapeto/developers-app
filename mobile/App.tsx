import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Poppins_400Regular, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';
import { QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';

import { LoadingPage } from './src/components/LoadingPage';
import Routes from './src/routes';
import { AccountContextProvider } from './src/contexts/account/AccountContext';
import { AppNavigationProvider } from './src/contexts/app-navigation/AppNavigationContext';
import { client } from './src/config/react-query';

export default function App() {
	const [isFontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold
	});

	if(!isFontsLoaded) {
		return <LoadingPage />;
	}

	return (
		<QueryClientProvider client={client}>
			<NavigationContainer>
				<AppNavigationProvider>
					<AccountContextProvider>
						<StatusBar style="light" />
						<Routes />
					</AccountContextProvider>
				</AppNavigationProvider>
			</NavigationContainer>
		</QueryClientProvider>
	);
}