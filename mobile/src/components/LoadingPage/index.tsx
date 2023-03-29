import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

import styles from './styles';

const { colors } = useTheme();

export function LoadingPage() {
	return(
		<View style={styles.pageContainer}>
			<ActivityIndicator color={colors.purple[300]}/>
		</View>
	);
}