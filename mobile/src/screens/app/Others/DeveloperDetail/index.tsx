import React, { useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Layout } from '~/components/Layout';
import { useAppNavigation } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';

interface Params {
   id?: string;
}

const { colors } = useTheme();

export function DeveloperDetail() {
	const route = useRoute();
	const appNavigation = useAppNavigation();
	const navigation = useNavigation();

	const developerId = useMemo<string>(() => {
		const { id } = route.params as Params;
		return id ?? '';
	}, [route.params]);

	function handleShowError() {
		appNavigation.openDialogBottom({
			buttonText: 'Ok!',
			description: 'Ops! Desenvolvedor não encontrado!',
			isError: true,
			title: 'Erro!',
			showButton: true,
			icon: (
				<Feather 
					name="alert-circle"
					color={colors.red[500]}
					size={40}
				/>
			),
			onCloseCallback: navigation.goBack,
		});
	}

	useFocusEffect(useCallback(() => {
		if(!developerId) {
			handleShowError();
		}
	}, [developerId]));

	return(
		<Layout 
			activeHeader
			headerProps={{ 
				title: 'Detalhe do Desenvolvedor',
				showBack: true,
			}}
		>
			<Text style={{ color: 'white'}}>
            Dev
			</Text>
		</Layout>
	);
}