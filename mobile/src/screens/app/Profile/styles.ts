import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { fontFamily, colors, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		paddingVertical: 20,
	},
	contentContainerStyle: {
		paddingBottom: 50,
	},
	headerContainer: {
		marginBottom: 30,
	},
	imageContainer: {
		flexDirection : 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	githubContainer: {
		marginTop: 20,
	},
	label: {
		color: colors.white,
		fontFamily: fontFamily.heading,
		fontSize: fontSize.md,
		marginBottom: 10,
	},
	image: {
		width: 150,
		height: 150,
		borderRadius: 75,
	},
	inputContainer: {
		marginBottom: 20,
	},
	buttonsContainer: {
		marginTop: 20,
	},
	editButton: {
		marginBottom: 10,
	}
});