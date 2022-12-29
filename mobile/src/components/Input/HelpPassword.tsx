import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { TextValidation } from '../../utils/TextValidation';

import styles from './styles';

interface HelpPasswordProps {
   onError?: (err: boolean) => void;
   text: string;
} 

export function HelpPassword(props: HelpPasswordProps) {
	const { text, onError } = props;
	const validations = useMemo(() => {
		const isEmptyValue = text.length === 0;

		const array = [
			{
				message: 'Possuir números',
				validation: TextValidation.hasNumber(text),
				isEmptyValue,
			},
			{
				message: 'Possuir caractéres especiais',
				validation: TextValidation.hasSpecialChars(text),
				isEmptyValue,
			},
			{
				message: 'Possuir letras maiúsculas',
				validation: TextValidation.hasUppercase(text),
				isEmptyValue,
			},
			{
				message: 'Possuir letras minúsculas',
				validation: TextValidation.hasLowercase(text),
				isEmptyValue,
			},
			{
				message: 'Possuir pelo menos 6 dígitos',
				validation: TextValidation.hasLenght(text, 6),
				isEmptyValue
			}
		];

		const hasError = array.some(item => !item.validation);

		onError?.(hasError);

		return array;
	}, [text]);


	return(
		<View style={styles.helpContainer}>
			<Text style={styles.securityText}>Para sua segurança, faça sua senha com os devidos requisitos</Text>

			<View>
				{
					validations.map((validation, index) => (
						<Text
							key={String(index)}
							style={[
								styles.textValidation,
								validation.validation ? styles.correctValidation : styles.wrongValidation,
								validation.isEmptyValue ? styles.emptyText : undefined
							]}
						>
							{validation.message}
						</Text>
					))
				}
			</View>
		</View>
	);
}