import { StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: {
		flexDirection : 'row',
	},
});