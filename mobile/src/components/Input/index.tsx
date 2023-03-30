import React, { ReactNode, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, TextInputProps } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import styles from './styles';
import { RenderValidation } from '../RenderValidation';
import { useTheme } from '~/hooks/useTheme';
import { HelpPassword } from './HelpPassword';

export interface InputProps extends Omit<TextInputProps, 'secureTextEntry' | 'onChange' | 'onChangeText'> {
   leftIcon?: ReactNode;
   label?: string;
   errorMessage?: string;
   isPassword?: boolean;
	showPasswordHelp?: boolean;
	onChangeText?: (text: string) => void;
	onErrorValidation?: (err: boolean) => void;
	name: string;
}

const { colors, fontSize } = useTheme();

export function Input(props: InputProps) {
	const [text, setText] = useState(props.value ?? '');

	const { 
		label, 
		errorMessage, 
		isPassword, 
		leftIcon, 
		showPasswordHelp,
		onChangeText,
		onErrorValidation,
		name,
		...restProps 
	} = props;

	const [isSecureText, setIsSecureText] = useState(isPassword);

	function togglePasswordView() {
		setIsSecureText(state => !state);
	}

	function handleChangeText(value: string) {
		setText(
			isPassword ? value.trim() : value
		);
		onChangeText?.(value);
	}

	function handleError(err: boolean) {
		onErrorValidation?.(err);
	}

	return(
		<View style={styles.container} key={name}>
			<RenderValidation 
				validation={!!label}
				validComponent={
					<Text style={styles.label}>{label}</Text>
				}
			/>
			<View style={styles.inputBox}>
				<RenderValidation 
					validation={!!leftIcon} 
					validComponent={
						<View style={styles.iconBox}>
							{leftIcon}
						</View>
					}
				/>

				<TextInput 
					style={styles.input} 
					autoCapitalize="none"
					{...restProps}
					keyboardAppearance="dark"
					onChangeText={handleChangeText}
					value={text}
					secureTextEntry={isSecureText}
				/>

				<RenderValidation 
					validation={!!isPassword} 
					validComponent={
						<View style={styles.iconBox}>
							<TouchableOpacity onPress={togglePasswordView}>
								<Octicons 
									color={colors.gray[300]}
									size={fontSize.md}
									name={isSecureText ? 'eye-closed' : 'eye'}
								/>
							</TouchableOpacity>
						</View>
					}
				/>

			</View>

			<RenderValidation 
				validation={!!(errorMessage)} 
				validComponent={
					<Text style={styles.error}>{errorMessage}</Text>
				}
			/>

			<RenderValidation 
				validation={!!(showPasswordHelp && isPassword)} 
				validComponent={
					<HelpPassword text={text} onError={handleError}/>
				}
			/>
		</View>
	);
}