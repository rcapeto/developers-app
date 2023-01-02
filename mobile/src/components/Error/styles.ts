import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	errorContainer: {
		flex: 1,
		alignItems: 'center',
		padding: 15,
		paddingTop: 40,
	},
	errorMessage: {
		fontSize: fontSize.md,
		fontFamily: fontFamily.medium,
		color: colors.red[500],
		marginTop: 10,
		textAlign: 'center',
	},
	buttonClose: {
		backgroundColor: colors.red[500],
		marginTop: 20,
		width: 200
	},
});