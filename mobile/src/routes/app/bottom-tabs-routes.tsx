import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Home from '~/screens/app/Home';
import Profile from '~/screens/app/Profile';
import Search from '~/screens/app/Search';
import NewPublication from '~/screens/app/NewPublication';

import { useTheme } from '~/hooks/useTheme';

const { colors, fontSize } = useTheme();
const { Navigator, Screen } = createBottomTabNavigator();

export function BottomTabsRoutes() {
	const size = fontSize.xl;

	return(
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: colors.purple[300],
				tabBarInactiveTintColor: colors.gray[300],
				tabBarStyle: {
					height: 90,
					borderTopWidth: 0,
					backgroundColor: colors.gray[800],
				},
			}}
		>
			<Screen 
				name="home"
				component={Home}
				options={{
					tabBarLabel: 'Início',
					tabBarIcon: ({ color }) => (
						<Feather 
							name="home"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Screen 
				name="newPublication"
				component={NewPublication}
				options={{
					tabBarLabel: 'Publicar',
					tabBarIcon: ({ color }) => (
						<Feather 
							name="plus-square"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Screen 
				name="search"
				component={Search}
				options={{
					tabBarLabel: 'Procurar',
					tabBarIcon: ({ color }) => (
						<Feather 
							name="search"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Screen 
				name="profile"
				component={Profile}
				options={{
					tabBarLabel: 'Perfil',
					tabBarIcon: ({ color }) => (
						<Feather 
							name="user"
							size={size}
							color={color}
						/>
					)
				}}
			/>
		</Navigator>
	);
}