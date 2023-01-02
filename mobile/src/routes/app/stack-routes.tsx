import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabsRoutes } from './bottom-tabs-routes';

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes() {
	return(
		<NavigationContainer>
			<Navigator screenOptions={{ headerShown: false }}>
				<Screen 
					name="bottomTabs"
					component={BottomTabsRoutes}
				/>
			</Navigator>
		</NavigationContainer>
	);
}