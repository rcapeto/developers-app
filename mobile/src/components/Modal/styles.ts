import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { colors } = useTheme();

export default StyleSheet.create({
	container: {
		backgroundColor: colors.gray[600],
		flex: 1,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 400,
		padding: 20,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
});