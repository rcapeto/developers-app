/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { 
	forwardRef, 
	ForwardRefRenderFunction,
	useCallback,
	useImperativeHandle,
	useMemo,
	useState, 
} from 'react';
import { Modal as ModalNative, StyleProp, TextStyle, View, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RenderValidation } from '../RenderValidation';

import styles from './styles';

export interface ModalOpenConfig {
	Component: React.FunctionComponent<any>;
	title: string;
	description: string;
	passProps: Record<string, any>;
	isSuccess: boolean;
	isError: boolean;
	icon: React.ReactNode;
	showButton: boolean;
	buttonText: string;
}
export interface ModalActions {
	onOpen: (config: Partial<ModalOpenConfig>) => void;
	onClose: () => void;
}

const Modal: ForwardRefRenderFunction<ModalActions> = (props, ref) => {
	const [state, setState] = useState<Partial<ModalOpenConfig>>({});
	const [visible, setVisible] = useState(false);

	function onOpen(config: Partial<ModalOpenConfig>) {
		setState(config);
		setVisible(true);
	}

	function onClose() {
		setState({});
		setVisible(false);
	}

	useImperativeHandle(ref, () => {
		return {
			onClose, onOpen
		};
	});

	const getStyles = useCallback((isTitle: boolean) => {
		const style: StyleProp<TextStyle>[] = [
			isTitle ? styles.title : styles.description
		];

		if(state.isError) {
			style.push(styles.isError);
		}

		if(state.isSuccess) {
			style.push(styles.isSuccess);
		}

		return style;

	}, [state]);

	const buttonStyles = useMemo(() => {
		const style: StyleProp<ViewStyle>[] = [styles.button];

		if(state.isError) {
			style.push(styles.buttonError);
		}

		if(state.isSuccess) {
			style.push(styles.buttonSuccess);
		}

		return style;

	}, [state]);

	const { Component } = state;

	return(
		<ModalNative
			transparent
			animationType="slide"
			visible={visible}
			collapsable
		>
			<View style={styles.container}>
				{ Component && <Component {...state.passProps}/>}

				<View style={styles.iconContainer}>
					{ state.icon }
				</View>

				<RenderValidation validation={!!state.title}>
					<Text style={getStyles(true)}>{state.title}</Text>
				</RenderValidation>

				<RenderValidation validation={!!state.description}>
					<Text style={getStyles(false)}>{state.description}</Text>
				</RenderValidation>

				<RenderValidation validation={!!state.showButton}>
					<TouchableOpacity onPress={onClose} style={buttonStyles}>
						<RenderValidation validation={!!state.buttonText}>
							<Text style={styles.buttonText}>{state.buttonText}</Text>
						</RenderValidation>
					</TouchableOpacity>
				</RenderValidation>
			</View>
		</ModalNative>
	);
};


export default forwardRef(Modal);