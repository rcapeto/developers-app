import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { 
	View,
	Text,
	Image,
	TouchableOpacity,
} from 'react-native';

import { Developer } from '../../../../../../../types/entitys';
import styles from './styles';
import { useTheme } from '../../../../../../../hooks/useTheme';
import { RenderValidation } from '../../../../../../../components/RenderValidation';

interface Props {
   developer: Developer;
}

const { colors, isAndroid, fontSize } = useTheme();
const emptyImage = 'https://css-tricks.com/examples/DragAvatar/images/256.jpg';

export function DeveloperItem({ developer }: Props) {
	const navigation = useNavigation();
	const imageURL = isAndroid ? developer.avatar_url.web : developer.avatar_url.mobile;

	console.log(imageURL);

	return(
		<View style={styles.container}>
			<Image 
				source={{ uri: imageURL || emptyImage }}
				style={styles.image}
			/>

			<View style={styles.info}>
				<Text style={styles.name}>{developer.name}</Text>

				<RenderValidation validation={developer.github.length > 0}>
					<Text style={styles.github}>
						<Feather 
							name="github" 
							size={fontSize.sm} 
							color={colors.purple[300]}
						/>
						{' '} { developer.github }
					</Text>
				</RenderValidation>

			</View>
		</View>
	);
}