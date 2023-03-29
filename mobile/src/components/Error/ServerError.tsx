import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { useTheme } from '~/hooks/useTheme';
import { Button } from '../Button';
const { colors } = useTheme();

interface ServerErrorProps {
	onCloseModal?: () => void;
}

export function ServerError(props: ServerErrorProps) {
	return(
		<View style={styles.errorContainer}>
			<Feather 
				name="alert-circle"
				color={colors.red[500]}
				size={40}
			/>

			<Text style={styles.errorMessage}>
				Ops! Error interno no servidor, por favor tente novamente! 😀
			</Text>

			<Button
				text='OK!'
				style={styles.buttonClose}
				onPress={props.onCloseModal}
			/>
		</View>
	);
}