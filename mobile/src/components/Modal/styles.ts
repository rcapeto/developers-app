import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

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
	iconContainer: {
		alignSelf: 'center',
	},
	title: {
		fontFamily: fontFamily.heading,
		fontSize: fontSize.md,
		color: colors.gray[200],
		textAlign: 'center',
		marginTop: 20,
	},
	description: {
		marginTop: 20,
		fontSize: fontSize.sm,
		fontFamily: fontFamily.body,
		textAlign: 'center',
		color: colors.gray[200],
	},
	isSuccess: {
		color: colors.green[500],
	},
	isError: {
		color: colors.red[500],
	},
	button: {
		backgroundColor: colors.purple[300],
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		borderRadius: 8,
		padding: 16,
	},
	buttonError: {
		backgroundColor: colors.red[500],
	},
	buttonSuccess: {
		backgroundColor: colors.green[500],
	},
	buttonText: {
		color: colors.white,
		fontFamily: fontFamily.medium,
		fontSize: fontSize.md,
	},
});