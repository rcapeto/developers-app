import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface ListHeaderProps {
   count: number;
	title: string;
}

export function ListHeader(props: ListHeaderProps) {
	return(
		<View style={styles.container}>
			<Text style={styles.text}>
				{props.title}:
			</Text>
			<Text style={styles.number}>
				{props.count}
			</Text>
		</View>
	);
}