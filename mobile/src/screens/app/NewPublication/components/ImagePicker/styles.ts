import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.gray[600],
		borderStyle: 'dashed',
		height: 200,
		position: 'relative',
	},
	hasContent: {
		borderStyle: 'solid'
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonText: {
		color: colors.gray[300],
		marginLeft: 8,
		fontSize: fontSize.xs,
		fontFamily: fontFamily.body
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover'
	},
	editButton: {
		position: 'absolute',
		backgroundColor: colors.purple[300],
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.7,
		top: 0,
		right: 0
	},
});