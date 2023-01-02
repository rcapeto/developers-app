import React, { ReactNode, useMemo } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Loading } from '../Loading';

import { RenderValidation } from '../RenderValidation';
import styles from './styles';

export interface ButtonProps extends TouchableOpacityProps {
   text: string;
   leftIcon?: ReactNode;
   rightIcon?: ReactNode;
   isLoading?: boolean;
   type?: 'outlined' | 'button';
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

	const isDisabled = rest.disabled;
	const isOutlined = type === 'outlined';

	const buttonStyles = useMemo(() => {
		const style: StyleProp<ViewStyle> = [styles.button];
      
		if(isDisabled) {
			style.push(styles.disabled);
		}

		if(isOutlined) {
			style.push(styles.outlined);
		}

		return style;
	}, [type, isDisabled, isOutlined]);

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