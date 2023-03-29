import React from 'react';
import { Text } from 'react-native';
import { Layout } from '~/components/Layout';

export default function NewPublication() {
	return(
		<Layout activeHeader headerProps={{ title: 'Nova publicação' }}>
			<Text>Olá New Publication</Text>
		</Layout>
	);
}