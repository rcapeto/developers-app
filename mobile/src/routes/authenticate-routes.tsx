import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '~/screens/authentication/Login';
import Register from '~/screens/authentication/Register';
import { routesConfig } from '~/config/routes-config';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthenticationRoutes() {
	return(
		<Navigator screenOptions={{ headerShown: false }}>
			<Screen 
				name={routesConfig.authentication.login}
				component={Login}
			/>
			<Screen 
				name={routesConfig.authentication.register}
				component={Register}
			/>
		</Navigator>
	);
}