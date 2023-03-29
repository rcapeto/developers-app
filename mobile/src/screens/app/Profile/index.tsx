import React from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Layout } from '~/components/Layout';
import { useAccount } from '~/hooks/useAccount';

import styles from './styles';

export default function Profile() {
	const { developer, me } = useAccount();

	useFocusEffect(() => {
		console.log('entrou profile');
	});

	return(
		<Layout activeHeader headerProps={{ title: 'Perfil'}}>
			<View>

			</View>
		</Layout>
	);
}