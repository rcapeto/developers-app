import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		paddingVertical: 20,
	},
	title: {
		color: colors.white,
		fontSize: fontSize.xl * 1.25,
		fontFamily: fontFamily.heading,
	},
	titlePurple: {
		color: colors.purple[500]
	},
	shortcutsTitleContainer: {
		fontFamily: fontFamily.heading,
		fontSize: fontSize.md,
		color: colors.white,
		paddingTop: 10,
		paddingBottom: 30,
	},
	shortcutsTitle: {
		fontFamily: fontFamily.heading,
		fontSize: fontSize.md,
		color: colors.white
	},
	shortcutsContainer: {
		paddingLeft: 20,
	},
	shortcutContainer: {
		backgroundColor: colors.gray[800],
		borderRadius: 8,
		padding: 16,
		width: 150
	},
	shortcutText: {
		marginTop: 15,
		color: colors.purple[300],
		fontSize: fontSize.sm,
		fontFamily: fontFamily.body
	},
});