import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../../hooks/useTheme';

const { colors, fontSize, fontFamily } = useTheme();

export default StyleSheet.create({
	container: {
		backgroundColor: colors.gray[800],
		padding: 15,
		borderRadius: 8,
		flexDirection: 'row',
		marginBottom: 20,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	info: {
		marginLeft: 20,
		flex: 1,
		justifyContent: 'space-between'
	},
	name: {
		fontSize: fontSize.md,
		fontFamily: fontFamily.medium,
		color: colors.gray[300],
	},
	github: {
		flexDirection: 'row',
		alignItems: 'center',
		color: colors.purple[300]
	},
	techs: {
	},
	tech: {
		backgroundColor: colors.purple[300],
		color: colors.white,
		fontSize: fontSize.sm,
		fontFamily: fontFamily.body
	},
});