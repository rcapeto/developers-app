import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.purple[300],
		borderRadius: 4,
		padding: 15,
	},
	outlined: {
		backgroundColor: 'transparent',
	},
	text: {
		color: colors.white,
		fontFamily: fontFamily.medium,
		textTransform: 'uppercase',
		fontSize: fontSize.sm
	},
	textOutlined: {
		color: colors.purple[300]
	},
	icon: {
		marginHorizontal: 8,
	},
	disabled: {
		backgroundColor: colors.purple[500],
		opacity: 0.5,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	contentOutlined: {
		borderBottomWidth: 1,
		borderColor: colors.purple[300],
		padding: 5,
	},
});