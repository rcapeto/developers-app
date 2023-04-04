import { StyleSheet } from 'react-native';

import { useTheme } from '~/hooks/useTheme';

const { colors, fontFamily, fontSize } = useTheme();

export default StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 30,
	},
	scrollContent: {
		paddingBottom: 100,
	},
	authorContainer: {
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	authorImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	authorNameContainer: {
		marginLeft: 10,
	},
	authorName: {
		fontFamily: fontFamily.medium,
		fontSize: fontSize.md,
		color: colors.gray[200]
	},
	thumbnailContainer: {
		marginTop: 10,
	},
	thumbnail: {
		width: '100%',
		height: 250
	},
	publicationStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 10,
	},
	likeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	likeText: {
		color: colors.red[500],
		fontSize: fontSize.sm,
		fontFamily: fontFamily.medium,
		marginRight: 5,
	},
	createdAtContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	createdAtLabelText: {
		color: colors.gray[300],
		marginRight: 5,
		fontSize: fontSize.xs,
		fontFamily: fontFamily.medium,
	},
	createdAtText: {
		color: colors.gray[300],
		fontSize: fontSize.xs,
		fontFamily: fontFamily.body,
	},
	title: {
		fontFamily: fontFamily.heading,
		fontSize: fontSize.lg,
		color: colors.white,
		marginTop: 10,
	},
	description: {
		fontFamily: fontFamily.body,
		color: colors.gray[300],
		marginTop: 20,
	},
});