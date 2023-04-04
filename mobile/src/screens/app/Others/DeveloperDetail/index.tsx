import React, { useCallback, useEffect, useMemo } from 'react';
import { ScrollView, Text, View, ImageSourcePropType, Image, TouchableOpacity } from 'react-native';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import moment from 'moment';

import { Layout } from '~/components/Layout';
import { useAppNavigation } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';
import { http } from '~/lib/http';
import { RenderValidation } from '~/components/RenderValidation';
import { Loading } from '~/components/Loading';
import appConfig from '~/config/app';
import styles from './styles';
import { useAccount } from '~/hooks/useAccount';
import { Field, FieldProps } from '~/components/Field';
import { Mapper } from '~/components/Mapper';

interface Params {
   id?: string;
}

moment.locale('pt-br');

export function DeveloperDetail() {
	const route = useRoute();
	const appNavigation = useAppNavigation();
	const navigation = useNavigation();
	const { isAndroid, fontSize } = useTheme();
	const { logout } = useAccount();
	const { colors } = useTheme();

	const developerId = useMemo<string>(() => {
		const { id } = route.params as Params;
		return id ?? '';
	}, [route.params]);

	const { data: developer, isError, isLoading, isRefetching } = useQuery(['developer', developerId], async () => {
		if(!developerId) {
			return;
		}

		const { response } = await http.developers().findOne({ developerId }, handleShowError, logout);
		return response?.data?.developer;
	});


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

	
	const developerImage = useMemo<ImageSourcePropType>(() => {
		const emptyImage = appConfig.emptyImage;

		if(developer && developer.avatar_url) {
			const avatarURL = developer.avatar_url;
			const image = !isAndroid ? avatarURL.web : avatarURL.mobile;

			return { uri: image || emptyImage };
		}

		return { uri: emptyImage };
	}, [developer, isAndroid]);

	function onCopyClipboard(github: string) {
		return async () => {
			if(github) {
				await Clipboard.setStringAsync(github).then(() => {
					Toast.show(`${github} copiado com sucesso.`, {
						duration: Toast.durations.LONG,
						animation: true,
						backgroundColor: colors.gray[600],
						textColor: colors.purple[300]
					});
				});
			}
		};
	}

	const fields = useMemo<FieldProps[]>(() => {
		const items: FieldProps[] = [];

		if(developer?.username) {
			items.push({
				name: 'Usuário:',
				value: developer.username
			});
		}

		if(developer?.points) {
			items.push({
				name: 'Pontos:',
				value: developer.points.toString(),
			});
		}

		if(developer?.techs) {
			items.push({
				name: 'Tecnologias:',
				value: developer.techs
			});
		}

		if(developer?.createdAt) {
			items.push({
				name: 'Membro desde:',
				value: moment(developer.createdAt).format('DD/MM/YYYY')
			});
		}

		return items;
	}, [developer]);

	function renderDeveloperInformation() {
		return(
			<ScrollView 
				showsVerticalScrollIndicator={false} 
				style={styles.container}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.header}>
					<View style={styles.imageContainer}>
						<Image source={developerImage} style={styles.image} />
					</View>

					<View style={styles.mainInformations}>
						<Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
							{developer?.name}
						</Text>

						<RenderValidation 
							validation={Boolean(developer && developer.github)}
							validComponent={
								<TouchableOpacity onPress={onCopyClipboard(developer?.github ?? '')}>
									<View style={styles.githubContainer}>
										<Feather 
											name="github" 
											size={fontSize.sm} 
											color={colors.purple[300]}
										/>
										<Text style={styles.githubText} numberOfLines={2} ellipsizeMode="tail">
											{developer?.github ?? ''}
										</Text>
									</View>
								</TouchableOpacity>
							}
						/>
					</View>
				</View>

				<View style={styles.restOfInformations}>
					<Mapper 
						data={fields}
						keyExtractor={field => field.name}
						renderItem={({ item: field }) => (
							<View style={styles.field}>
								<Field {...field }/>
							</View>
						)}
					/>
				</View>
			</ScrollView>
		);
	}

	useFocusEffect(useCallback(() => {
		if(!developerId) {
			handleShowError();
		}
	}, [developerId]));

	useEffect(() => {
		if (isError) {
			handleShowError();
		}
	}, [isError]);

	return(
		<Layout 
			activeHeader
			headerProps={{ title: 'Detalhes do(a) Dev', showCloseButton: true }}
		>
			<RenderValidation 
				validation={isLoading || isRefetching}
				validComponent={<Loading style={{ marginTop: 20 }} message='Carregando...'/>}
				unvalidComponent={renderDeveloperInformation()}
			/>
		</Layout>
	);
}