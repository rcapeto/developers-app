import React, { ReactNode, useMemo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Loading } from '../Loading';

import { RenderValidation } from '../RenderValidation';
import styles from './styles';

export type ButtonType = 'outlined' | 'error-button' | 'success-button';

export interface ButtonProps extends TouchableOpacityProps {
   text: string;
   leftIcon?: ReactNode;
   rightIcon?: ReactNode;
   isLoading?: boolean;
   type?: ButtonType;
}

export function Button(props: ButtonProps) {
	const { 
		text, 
		leftIcon, 
		rightIcon, 
		isLoading, 
		type, 
		style, 
		...rest 
	} = props;

	const buttonStyles = useMemo(() => {
		const isDisabled = rest.disabled;
		const isOutlined = type === 'outlined';
		const isSuccess = type === 'success-button';
		const isError = type === 'error-button';
		const style: StyleProp<ViewStyle> = [styles.button];
      
		if(isDisabled) {
			style.push(styles.disabled);
		}

		if(isOutlined) {
			style.push(styles.outlined);
		}

		if(isError) {
			style.push(styles.buttonError);
		}

		if(isSuccess) {
			style.push(styles.buttonSuccess);
		}

		return style;
	}, [type, rest.disabled]);

	const isOutlined = useMemo(() => {
		return type === 'outlined';
	}, [type]);

	return(
		<TouchableOpacity {...rest} style={[buttonStyles, style]}>
			{
				isLoading ? (<Loading spinnerColor="white"/>) : (
					<View style={[styles.content, isOutlined ? styles.contentOutlined : undefined]}>
						<RenderValidation validation={!!leftIcon}>
							<View style={styles.icon}>
								{ leftIcon }
							</View>
						</RenderValidation>

						<Text style={[styles.text, isOutlined ? styles.textOutlined : undefined]}>
							{text}
						</Text>

						<RenderValidation validation={!!rightIcon}>
							<View style={styles.icon}>
								{ rightIcon }
							</View>
						</RenderValidation>
               
					</View>
				)
			}
		</TouchableOpacity>
	);
}