import React, { useMemo, useCallback } from 'react';
import { View, Text, ImageSourcePropType, Image, TouchableOpacity, ImageErrorEventData, NativeSyntheticEvent } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '~/hooks/useTheme';
import { Publication } from '~/lib/http/types/entity';
import appConfig from '~/config/app';
import styles from './styles';
import { RenderValidation } from '~/components/RenderValidation';

interface PublicationItemProps {
   publication: Publication;
}

export function PublicationItem({ publication }: PublicationItemProps) {
	const navigation = useNavigation();
	const { isAndroid, colors, fontSize } = useTheme();

	const thumbnailImage = useMemo<ImageSourcePropType>(() => {
		const emptyImage = appConfig.emptyThumbnail;

		if(publication && publication.thumbnail) {
			const url = publication.thumbnail;
			const image = !isAndroid ? url.web : url.mobile;

			return { uri: image || emptyImage };
		}
		return { uri: emptyImage };
	}, [publication, isAndroid]);

	const handleNavigatePublicationScreen = useCallback(() => {
		if(publication) {
			navigation.navigate('publicationDetail', { 
				id: publication.id,
			});
		}
	}, [navigation, publication]);

	function onErrorRenderImage(error: NativeSyntheticEvent<ImageErrorEventData>) {
		error.currentTarget.setNativeProps({ 
			source: [{ uri: appConfig.emptyThumbnail }]
		});
	}

	if(!publication) {
		return null;
	}
   
	return(
		<TouchableOpacity style={styles.container} onPress={handleNavigatePublicationScreen}>
			<View style={styles.imageContainer}>
				<Image 
					source={thumbnailImage} 
					style={styles.image} 
					onError={onErrorRenderImage}
				/>
			</View>

			<View style={styles.information}>
				<Text style={styles.publicationTitle} numberOfLines={2} ellipsizeMode="tail">
					{publication.title}
				</Text>

				<View style={styles.footer}>
					<Text style={styles.developerName} numberOfLines={1} ellipsizeMode="tail">
						Autor: {publication.developer.name}
					</Text>

					<RenderValidation 
						validation={Boolean(publication.developer.github)}
						validComponent={
							<View style={styles.githubContainer}>
								<Feather 
									name="github" 
									size={fontSize.xs}
									color={colors.purple[300]}
								/>
								<Text style={styles.github} numberOfLines={1} ellipsizeMode="tail">
									{publication.developer.github}
								</Text>
							</View>
						}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
}