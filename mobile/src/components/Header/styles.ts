import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { colors, fontFamily, fontSize, isAndroid } = useTheme();

export default StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: colors.gray[800],
		flexDirection: 'row',
		paddingHorizontal: 30,
		paddingTop: isAndroid ? 20 : 50,
		paddingBottom: 20,
	},
	empty: {
		height: 20,
		width: 20
	},
	title: {
		fontSize: fontSize.md,
		color: colors.white,
		fontFamily: fontFamily.medium
	},
});