import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routesConfig } from '~/config/routes-config';
import { BottomTabsRoutes } from './bottom-tabs-routes';
import { DeveloperDetail } from '~/screens/app/Others/DeveloperDetail';

const { Screen, Navigator } = createNativeStackNavigator();

export function AppRoutes() {
	return(
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen 
				name={routesConfig.app.bottomTabs}
				component={BottomTabsRoutes}
			/>
			<Screen 
				name={routesConfig.app.developerDetail}
				component={DeveloperDetail}
			/>
		</Navigator>
	);
}