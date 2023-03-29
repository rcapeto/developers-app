import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	searchContainer: {
		paddingVertical: 15,
	},
	inputContainer: {
		paddingTop: 10,
	},
	input: {
		backgroundColor: colors.gray[800],
		padding: 15,
		borderRadius: 8,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		color: colors.white,
		fontFamily: fontFamily.body,
		fontSize: fontSize.sm
	},
	buttons: {
		backgroundColor: colors.gray[800],
		borderRadius: 8,
		flexDirection: 'row',
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		flex: 1,
		borderRadius: 8,
	},
	activeButton: {
		backgroundColor: colors.gray[600]
	},
	buttonText: {
		color: colors.gray[200],
		fontFamily: fontFamily.body
	},
	loadingContainer: {
		marginTop: 20,
	},
});