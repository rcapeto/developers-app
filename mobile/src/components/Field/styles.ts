import { StyleSheet } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	labelTitle: {
		color: colors.white,
		fontFamily: fontFamily.heading,
		fontSize: fontSize.md,
		marginBottom: 10,
	},
	input: {
		borderRadius: 8,
		backgroundColor: colors.gray[800],
		paddingVertical: 20,
		paddingHorizontal: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputText: {
		color: colors.purple[500],
		fontFamily: fontFamily.medium,
		fontSize: fontSize.sm,
	},
	tech: {
		backgroundColor: colors.gray[600],
		padding: 8,
		marginRight: 10,
		borderRadius: 4,
	},
	techText: {
		color: colors.purple[500],
		fontSize: fontSize.sm,
		fontFamily: fontFamily.body,
	},
});