import React, { useMemo, useCallback } from 'react';
import { FlatList, Text, TextStyle, View } from 'react-native';

import { helpPasswordValidation } from './utils/help-password-validation';

import styles from './styles';

interface HelpPasswordProps {
   onError?: (err: boolean) => void;
   text: string;
	onSuccess?: () => void;
} 

export function HelpPassword(props: HelpPasswordProps) {
	const dispatchCallback = useCallback((hasError: boolean) => {
		if(hasError) {
			props?.onError?.(hasError);
		} else {
			props?.onSuccess?.();
		}
	}, [props]);

	const validations = useMemo(() => {
		const text = props.text;
		const isEmptyValue = text.length === 0;

		const array = [
			{
				message: 'Possuir números',
				isValid: helpPasswordValidation('number')(text),
				isEmptyValue,
			},
			{
				message: 'Possuir caractéres especiais',
				isValid: helpPasswordValidation('specialChars')(text),
				isEmptyValue,
			},
			{
				message: 'Possuir letras maiúsculas',
				isValid: helpPasswordValidation('uppercase')(text),
				isEmptyValue,
			},
			{
				message: 'Possuir letras minúsculas',
				isValid: helpPasswordValidation('lowercase')(text),
				isEmptyValue,
			},
			{
				message: 'Possuir pelo menos 6 dígitos',
				isValid: helpPasswordValidation('hasLenght')(text, 6),
				isEmptyValue
			}
		];

		const hasError = array.some(item => !item.isValid);

		if(!isEmptyValue) {
			dispatchCallback(hasError);
		}

		return array;
	}, [props, dispatchCallback]);

	function getValidationStyle(isValid: boolean, isEmptyValue: boolean) {
		const style: TextStyle[] = [styles.textValidation];

		if(isValid) {
			style.push(styles.correctValidation);
		} else {
			style.push(styles.wrongValidation);
		}

		if(isEmptyValue) {
			style.push(styles.emptyText);
		}

		return style;
	}

	return(
		<View style={styles.helpContainer}>
			<Text style={styles.securityText}>
				Para sua segurança, faça sua senha com os devidos requisitos
			</Text>

			<FlatList 
				data={validations}
				keyExtractor={item => item.message}
				renderItem={({ item: validation }) => (
					<Text
						style={getValidationStyle(validation.isValid, validation.isEmptyValue)}
					>
						{validation.message}
					</Text>
				)}
			/>

		</View>
	);
}