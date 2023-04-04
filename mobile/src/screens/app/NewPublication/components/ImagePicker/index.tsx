import React, { Fragment, useMemo } from 'react';
import { View, Text, ViewStyle, TouchableOpacity, Image } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
import { Feather, FontAwesome } from '@expo/vector-icons';

import styles from './styles';
import { first } from '~/utils/first';
import { RenderValidation } from '~/components/RenderValidation';
import { useTheme } from '~/hooks/useTheme';

interface ImagePickerProps {
   currentImage?: string;
   onChangeImage?: (uri: string) => void;
}

export function ImagePicker(props: ImagePickerProps) {
	const { colors } = useTheme();

	async function pickImage() {
		const result = await ExpoImagePicker.launchImageLibraryAsync({
			mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			allowsMultipleSelection: false,
		});

		console.log('result here', result);

		if(!result.canceled) {
			const image = first(result.assets)?.uri ?? '';

			if(image) {
				props?.onChangeImage?.(image);
			}
		}
	}

	const containerStyles = useMemo(() => {
		const style: ViewStyle[] = [styles.container];

		if(props.currentImage) {
			style.push(styles.hasContent);
		}

		return style;
	}, [props.currentImage]);

	return(
		<View style={containerStyles}>
			<RenderValidation 
				validation={!!props.currentImage}
				unvalidComponent={
					<TouchableOpacity style={styles.button} onPress={pickImage}>
						<Feather 
							name="camera"
							size={18}
							color={colors.gray[300]}
						/>
						<Text style={styles.buttonText}>
                     Selecione uma imagem
						</Text>
					</TouchableOpacity>
				}
				validComponent={
					<Fragment>
						<Image 
							style={styles.image}
							source={{ uri: props.currentImage }}
						/>
						<TouchableOpacity style={styles.editButton} onPress={pickImage}>
							<FontAwesome 
								size={18}
								color={colors.white}
								name="pencil"
							/>
						</TouchableOpacity>
					</Fragment>
				}
			/>
		</View>
	);
}