import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { fontFamily, colors, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
	},
	scrollContent: {
		paddingBottom: 100,
	},
	header: {
		flexDirection: 'row',
	},
	imageContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 60,
	},
	mainInformations: {
		paddingLeft: 20,
		justifyContent: 'center',
		flex: 1,
	},
	name: {
		color: colors.white,
		fontFamily: fontFamily.heading,
		fontSize: fontSize.lg,
	},
	githubContainer: {
		paddingTop: 15,
		flexDirection: 'row',
		alignItems: 'center',
	},
	githubText: {
		marginLeft: 5,
		color: colors.purple[300],
		fontSize: fontSize.md,
		fontFamily: fontFamily.medium,
	},
	restOfInformations: {
		paddingTop: 40,
		paddingBottom: 20,
	},
	field: {
		marginBottom: 15,
	},
});