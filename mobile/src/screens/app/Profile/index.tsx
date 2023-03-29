import React from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Layout } from '~/components/Layout';
import { useAccount } from '~/hooks/useAccount';

import styles from './styles';
import { Button } from '~/components/Button';

export default function Profile() {
	const { developer, me, logout } = useAccount();

	useFocusEffect(() => {
		console.log('entrou profile');
	});

	return(
		<Layout activeHeader headerProps={{ title: 'Perfil'}}>
			<View>
				<Button 
					onPress={logout}
					text="Sair"
					style={{ marginTop: 20 }}
				/>
			</View>
		</Layout>
	);
}