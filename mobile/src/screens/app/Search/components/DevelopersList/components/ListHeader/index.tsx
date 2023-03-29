import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface ListHeaderProps {
   count: number;
}

export function ListHeader(props: ListHeaderProps) {
	return(
		<View style={styles.container}>
			<Text style={styles.text}>
            Desenvolvedores:
			</Text>
			<Text style={styles.number}>
				{props.count}
			</Text>
		</View>
	);
}