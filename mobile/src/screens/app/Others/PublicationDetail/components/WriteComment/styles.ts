import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
	},
	title: {
		color: colors.white,
		fontFamily: fontFamily.heading,
		fontSize: fontSize.lg,
	},
	input: {
		width: '100%',
		backgroundColor: colors.gray[800],
		borderRadius: 8,
		minHeight: 200,
		marginTop: 20,
		color: colors.white,
		fontSize: fontSize.md,
		fontFamily: fontFamily.body,
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	button: {
		marginTop: 20,
	},
});