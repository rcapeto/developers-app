import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../Button';

interface RegisterErrorProps {
	onCloseModal: () => void;
}

const { colors } = useTheme();

export function RegisterSuccess(props: RegisterErrorProps) {
	const navigation = useNavigation();
   
	const handlePress = useCallback(() => {
		props?.onCloseModal?.();
		navigation.navigate('login');      
	}, [props.onCloseModal, navigation]);

	return(
		<View style={styles.successContainer}>
			<AntDesign 
				name="checkcircle"
				color={colors.green[500]}
				size={40}
			/>

			<Text style={styles.successMessage}>
				Usuário cadastrado com sucesso!
			</Text>

			<Button
				text='OK!'
				style={styles.buttonClose}
				onPress={handlePress}
			/>
		</View>
	);
}