import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingBottom: 10,
		marginVertical: 20,
		borderTopWidth: 1,
		borderColor: colors.gray[600]
	},
	text: {
		fontFamily: fontFamily.medium,
		fontSize: fontSize.md,
		color: colors.white
	},
	number: {
		fontFamily: fontFamily.heading,
		fontSize: fontSize.sm,
		color: colors.purple[300]
	},
});