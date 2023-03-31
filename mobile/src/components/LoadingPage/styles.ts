import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors } = useTheme();

export default StyleSheet.create({
	pageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: colors.gray[900]
	},
});