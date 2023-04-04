import React, { useCallback, useEffect, useMemo } from 'react';
import { Text, View, ImageSourcePropType, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import moment from 'moment';

import { Layout } from '~/components/Layout';
import { useAppNavigation } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';
import { http } from '~/lib/http';
import { useAccount } from '~/hooks/useAccount';
import { RenderValidation } from '~/components/RenderValidation';
import { Loading } from '~/components/Loading';
import { WriteComment } from './components/WriteComment';
import appConfig from '~/config/app';
import styles from './styles';

interface Params {
   id?: string;
}

moment.locale('pt-br');

export function PublicationDetail() {
	const route = useRoute();
	const appNavigation = useAppNavigation();
	const navigation = useNavigation();
	const { logout } = useAccount();
	const { isAndroid, colors } = useTheme();

	const publicationId = useMemo<string>(() => {
		const { id } = route.params as Params;
		return id ?? '';
	}, [route.params]);

	const { data: publication, isLoading, isError, isFetching } = useQuery(['publication', publicationId], async () => {
		if(!publicationId) {
			return;
		}

		const { response } = await http.publications().findOne({ publicationId }, handleShowError, logout);
		return response?.data?.publication;
	});

	const thumbnailImage = useMemo<ImageSourcePropType>(() => {
		const emptyImage = appConfig.emptyThumbnail;

		if(publication && publication.thumbnail) {
			const url = publication.thumbnail;
			const image = !isAndroid ? url.web : url.mobile;

			return { uri: image || emptyImage };
		}
		return { uri: emptyImage };
	}, [publication, isAndroid]);

	const authorImage = useMemo<ImageSourcePropType>(() => {
		const emptyImage = appConfig.emptyImage;
		const developer = publication?.developer;

		if(developer && developer.avatar_url) {
			const avatarURL = developer.avatar_url;
			const image = !isAndroid ? avatarURL.web : avatarURL.mobile;

			return { uri: image || emptyImage };
		}

		return { uri: emptyImage };
	}, [publication, isAndroid]);

	function handleNavigateDeveloperDetail(developerId?: string) {
		return () => {
			if(!developerId) {
				return;
			}

			navigation.navigate('developerDetail', {
				id: developerId,
			});
		};
	}

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

	function handleLikeOrUnlikePublication() {
		console.log('Like/Unlike publication');
	}

	function renderPublicationContent() {
		return(
			<ScrollView 
				style={styles.container} 
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<TouchableOpacity onPress={handleNavigateDeveloperDetail(publication?.developerId)}>
					<View style={styles.authorContainer}>
						<Image source={authorImage} style={styles.authorImage} />

						<View style={styles.authorNameContainer}>
							<Text style={styles.authorName}>
								{publication?.developer?.name}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
				<View style={styles.thumbnailContainer}>
					<Image 
						source={thumbnailImage} 
						style={styles.thumbnail}
						resizeMode="cover"
					/>

					<View style={styles.publicationStatus}>
						<TouchableOpacity onPress={handleLikeOrUnlikePublication}>
							<View style={styles.likeContainer}>
								<Text style={styles.likeText}>
									{(publication?.likes ?? []).length}
								</Text>
								<Feather 
									size={20}
									name="heart"
									color={colors.red[500]}
								/>
							</View>
						</TouchableOpacity>

						<View style={styles.createdAtContainer}>
							<Text style={styles.createdAtLabelText}>
								Publicado em:
							</Text>
							<Text style={styles.createdAtText}>
								{moment(publication?.createdAt ?? '').format('DD/MM/YYYY HH:mm')}
							</Text>
						</View>
					</View>
				</View>

				<Text style={styles.title}>
					{publication?.title ?? ''}
				</Text>

				<Text style={styles.description}>
					{publication?.description ?? ''}
				</Text>

				<WriteComment 
					developerId={publication?.developerId ?? ''}
					publicationId={publication?.id ?? ''}
				/>
			</ScrollView>
		);
	}

	useFocusEffect(useCallback(() => {
		if(!publicationId) {
			handleShowError();
		}
	}, [publicationId]));

	useEffect(() => {
		if(isError) {
			handleShowError();
		}
	}, [isError]);

	return(
		<Layout 
			activeHeader
			headerProps={{ title: 'Detalhes da Publicação', showCloseButton: true }}
		>
			<RenderValidation 
				validation={isLoading || isFetching}
				validComponent={<Loading style={{ marginTop: 20 }} message='Carregando...'/>}
				unvalidComponent={renderPublicationContent()}
			/>
		</Layout>
	);
}