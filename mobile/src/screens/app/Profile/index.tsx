import React from 'react';
import { Text } from 'react-native';
import { Layout } from '../../../components/Layout';

export default function Profile() {
	return(
		<Layout activeHeader headerProps={{ title: 'Perfil'}}>
			<Text>Olá Profile</Text>
		</Layout>
	);
}