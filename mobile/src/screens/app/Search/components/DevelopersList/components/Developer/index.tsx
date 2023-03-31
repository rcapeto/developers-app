import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { 
	View,
	Text,
	Image,
	TouchableOpacity,
	ImageSourcePropType,
} from 'react-native';

import { Developer } from '~/lib/http/types/entity';
import styles from './styles';
import { useTheme } from '~/hooks/useTheme';
import { RenderValidation } from '~/components/RenderValidation';
import appConfig from '~/config/app';

interface Props {
   developer: Developer;
}

const { colors, isAndroid, fontSize } = useTheme();

export function DeveloperItem({ developer }: Props) {
	const navigation = useNavigation();

	const handleNavigateDeveloperScreen = useCallback(() => {
		if(developer) {
			navigation.navigate('developerDetail', { 
				id: developer.id,
			});
		}
	}, [navigation, developer]);

	const developerImage = useMemo<ImageSourcePropType>(() => {
		const emptyImage = appConfig.emptyImage;

		if(developer && developer.avatar_url) {
			const avatarURL = developer.avatar_url;
			const image = !isAndroid ? avatarURL.web : avatarURL.mobile;

			return { uri: image || emptyImage };
		}

		return { uri: emptyImage };
	}, [developer, isAndroid]);

	if(!developer) {
		return null;
	}

	return(
		<TouchableOpacity onPress={handleNavigateDeveloperScreen}>
			<View style={styles.container}>
				<Image 
					source={developerImage}
					style={styles.image}
				/>

				<View style={styles.info}>
					<Text style={styles.name}>{developer.name}</Text>

					<RenderValidation 
						validation={developer.github.length > 0} 
						validComponent={
							<Text style={styles.github}>
								<Feather 
									name="github" 
									size={fontSize.sm} 
									color={colors.purple[300]}
								/>
								{' '} { developer.github }
							</Text>
						}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
}