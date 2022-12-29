import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/authentication/Login';
import Register from '../screens/authentication/Register';
import { routesConfig } from '../config/routes-config';

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthenticationRoutes() {
	return(
		<NavigationContainer>
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
		</NavigationContainer>
	);
}