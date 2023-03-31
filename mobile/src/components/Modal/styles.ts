import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize, isAndroid } = useTheme();

export default StyleSheet.create({
	container: {
		backgroundColor: colors.gray[600],
		flex: 1,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: 20,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		paddingBottom: isAndroid ? 20 : 30,
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
		marginTop: 5,
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
		marginTop: 20,
	}
});