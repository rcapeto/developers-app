import React from 'react';
import { Text } from 'react-native';
import { Layout } from '../../../components/Layout';

export default function Home() {
	return(
		<Layout activeHeader headerProps={{ title: 'Início' }}>
			<Text>Olá home</Text>
		</Layout>
	);
}