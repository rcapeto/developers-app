import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	titleContainer: {
		marginTop: 20,
	},
	title: {
		color: colors.white,
		fontFamily: fontFamily.heading,
		fontSize: fontSize.xl,
	},
	form: {
		marginTop: 40,
	},
	formContent: {
		paddingBottom: 70,
	},
	input: {
		marginBottom: 20,
	},
	button: {
		marginTop: 20,
	},
});