import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flexDirection: 'column',
		paddingVertical: 10,
	},
	label: {
		color: colors.gray[200],
		fontFamily: fontFamily.medium,
		fontSize: fontSize.md,
	},
	inputBox: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		marginTop: 10,
		width: '100%',
		backgroundColor: colors.gray[800],
		borderRadius: 8,
		padding: 15,
	},
	iconBox: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingRight: 15,
	},
	input: {
		flex: 1,
		color: colors.white,
		fontSize: fontSize.md,
		fontFamily: fontFamily.body,
	},
	error: {
		marginTop: 10,
		color: colors.red[500],
		fontFamily: fontFamily.body,
		fontSize: fontSize.sm,
	},

	//HelpPassword styles
	helpContainer: {
		marginTop: 20,
	},
	securityText: {
		fontSize: fontSize.xs,
		color: colors.gray[200],
		fontFamily: fontFamily.body,
		marginBottom: 10,
	},
	textValidation: {
		fontSize: fontSize.xs,
		fontFamily: fontFamily.body,
		marginTop: 5,
	},
	emptyText: {
		color: colors.gray[200],
	},
	correctValidation: {
		color: colors.green[500],
	},
	wrongValidation: {
		color: colors.red[500]
	},
});