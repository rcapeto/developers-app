import React, { useMemo } from 'react';
import { Image, ImageSourcePropType, View, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';

import { Layout } from '~/components/Layout';
import { useAccount } from '~/hooks/useAccount';
import { useTheme } from '~/hooks/useTheme';

import styles from './styles';
import { Button } from '~/components/Button';
import { Field, FieldProps } from '~/components/Field';
import { RenderValidation } from '~/components/RenderValidation';
import appConfig from '~/config/app';

moment.locale('pt-br');
interface ParamsItem {
	item: FieldProps;
}

export default function Profile() {
	const { developer, logout } = useAccount();
	const { isAndroid, colors, fontSize } = useTheme();

	const developerImage = useMemo<ImageSourcePropType>(() => {
		const emptyImage = appConfig.emptyImage;

		if(developer && developer.avatar_url) {
			const avatarURL = developer.avatar_url;
			const image = !isAndroid ? avatarURL.web : avatarURL.mobile;

			return { uri: image || emptyImage };
		}

		return { uri: emptyImage };
	}, [developer, isAndroid]);

	function renderItem(params: ParamsItem) {
		return(
			<View style={styles.inputContainer}>
				<Field 
					name={params.item.name}
					value={params.item.value}
				/>
			</View>
		);
	}

	const fields = useMemo<FieldProps[]>(() => {
		const items: FieldProps[] = [];

		if(developer?.name) {
			items.push({
				name: 'Nome:',
				value: developer.name
			});
		}

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

	return(
		<Layout activeHeader headerProps={{ title: 'Perfil'}}>
			<FlatList 
				style={styles.container}
				ListHeaderComponent={
					<View style={styles.headerContainer}>
						<View style={styles.imageContainer}>
							<Image 
								style={styles.image}
								source={developerImage}
							/>
						</View>

						<View style={styles.githubContainer}>
							<RenderValidation 
								validation={Boolean(developer?.github)} 
								validComponent={
									<Field 
										name="Github"
										value={developer?.github ?? ''}
									/>
								}
								unvalidComponent={
									<Button 
										text="Cadastrar Github"
										type="outlined"
										rightIcon={
											<Feather 
												name="github" 
												size={fontSize.sm} 
												color={colors.purple[300]}
											/>
										}
									/>
								}
							/>
						</View>
					</View>
				}
				data={fields}
				keyExtractor={field => field.name}
				renderItem={renderItem}
				ListFooterComponent={
					<View style={styles.buttonsContainer}>
						<Button 
							text="Editar perfil"
							style={styles.editButton}
						/>
						<Button 
							text="Sair"
							onPress={logout}
							type="error-button"
						/>
					</View>
				}
				contentContainerStyle={styles.contentContainerStyle}
			/>
		</Layout>
	);
}