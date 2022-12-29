import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { colors } = useTheme();

export default StyleSheet.create({
	indicator: {
		backgroundColor: colors.purple[300]
	},
	container: {
		backgroundColor: colors.gray[600],
	},
	content: {
		flex: 1,
		alignItems: 'center',
	},
});