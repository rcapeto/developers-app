import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../Button';

interface LoginErrorProps {
   errorMessage: string;
	onCloseModal: () => void;
}

const { colors } = useTheme();

export function LoginError(props: LoginErrorProps) {
	const hasUser = !props.errorMessage.includes('register');

	const message = hasUser ? 
		'Usuário ou senha, estão incorretos' : 
		'Usuário não encontrado, por favor cadastre-se'
   ;

	return(
		<View style={styles.errorContainer}>
			<Feather 
				name="alert-circle"
				color={colors.red[500]}
				size={40}
			/>

			<Text style={styles.errorMessage}>
				{message}
			</Text>

			<Button
				text='OK!'
				style={styles.buttonClose}
				onPress={props.onCloseModal}
				type="error-button"
			/>
		</View>
	);
}