import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		backgroundColor: colors.gray[800],
		padding: 15,
		borderRadius: 8,
		flexDirection: 'row',
		marginBottom: 20,
	},
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	information: {
		flex: 1,
		marginLeft: 8,
		justifyContent: 'space-between'
	},
	publicationTitle: {
		marginBottom: 5,
		fontFamily: fontFamily.heading,
		color: colors.white,
		fontSize: fontSize.sm,
	},
	footer: {
		marginTop: 10,
	},
	developerName: {
		color: colors.gray[300],
		fontSize: fontSize.xs,
		fontFamily: fontFamily.body,
	},
	githubContainer: {
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	github: {
		color: colors.purple[300],
		fontSize: fontSize.xs,
		fontFamily: fontFamily.body,
		marginLeft: 8,
	},
});