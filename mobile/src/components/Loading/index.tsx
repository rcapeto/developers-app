import React from 'react';
import { View, ActivityIndicator, StyleProp, ViewStyle, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import styles from './styles';


interface LoadingProps {
	style?: StyleProp<ViewStyle>;
	spinnerColor?: string;
	message?: string;
}

const { colors } = useTheme();

export function Loading({ 
	style,
	spinnerColor = colors.purple[300],
	message,
}: LoadingProps) {
	return(
		<View style={[styles.container, style]}>
			<ActivityIndicator
				color={spinnerColor}
			/>
			{
				message && (
					<Text style={styles.text}>{message}</Text>
				)
			}
		</View>
	);
}