import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: colors.white,
		fontSize: fontSize.sm,
		fontFamily: fontFamily.body,
		marginTop: 10,
	},
});