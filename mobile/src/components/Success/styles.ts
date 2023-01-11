import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { colors, fontSize, fontFamily } = useTheme();

export default StyleSheet.create({
	successContainer: {
		flex: 1,
		alignItems: 'center',
		padding: 15,
		paddingTop: 40,
	},
	successMessage: {
		fontSize: fontSize.md,
		fontFamily: fontFamily.medium,
		color: colors.green[500],
		marginTop: 10,
		textAlign: 'center',
	},
	buttonClose: {
		backgroundColor: colors.green[500],
		marginTop: 20,
		width: 200
	},
});