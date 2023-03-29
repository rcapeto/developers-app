import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	text: {
		fontFamily: fontFamily.heading,
		fontSize: fontSize.xl,
		color: colors.gray[200]
	},
	center: {
		textAlign: 'center',
	},
});