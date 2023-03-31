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

export function PublicationDetail() {
	const route = useRoute();
	const appNavigation = useAppNavigation();
	const navigation = useNavigation();

	const publicationId = useMemo<string>(() => {
		const { id } = route.params as Params;
		return id ?? '';
	}, [route.params]);

	function handleShowError() {
		appNavigation.openDialogBottom({
			buttonText: 'Ok!',
			description: 'Ops! Publicação não encontrada!',
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
		if(!publicationId) {
			handleShowError();
		}
	}, [publicationId]));

	return(
		<Layout 
			activeHeader
			headerProps={{ 
				title: 'Detalhes da Publicação',
				showCloseButton: true,
			}}
		>
			<Text style={{ color: 'white'}}>
            Publicação
			</Text>
		</Layout>
	);
}