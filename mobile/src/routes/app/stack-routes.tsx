import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { routesConfig } from '~/config/routes-config';
import { BottomTabsRoutes } from './bottom-tabs-routes';
import { DeveloperDetail } from '~/screens/app/Others/DeveloperDetail';
import { PublicationDetail } from '~/screens/app/Others/PublicationDetail';

const { Screen, Navigator, Group } = createNativeStackNavigator();

export function AppRoutes() {
	return(
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen 
				name={routesConfig.app.bottomTabs}
				component={BottomTabsRoutes}
			/>

			<Group screenOptions={{ presentation: 'containedModal' }}>
				<Screen 
					name={routesConfig.app.developerDetail}
					component={DeveloperDetail}
				/>
				<Screen 
					name={routesConfig.app.publicationDetail}
					component={PublicationDetail}
				/>
			</Group>
		</Navigator>
	);
}