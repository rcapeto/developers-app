import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../Button';

interface RegisterErrorProps {
	onCloseModal: () => void;
   errorMessage: string;
}

const { colors } = useTheme();

export function RegisterError(props: RegisterErrorProps) {
	const errorHasDeveloper = 'There is already a developer with this username';
	const hasDeveloper = props.errorMessage === errorHasDeveloper;
	const message = hasDeveloper ? 'Já existe um usuário com esse usuário' : 'Por favor preencha todos os campos corretamente.';

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
			/>
		</View>
	);
}