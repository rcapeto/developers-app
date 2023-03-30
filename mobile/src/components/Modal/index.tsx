/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { 
	forwardRef, 
	ForwardRefRenderFunction,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
	useState, 
} from 'react';
import { Modal as ModalNative, StyleProp, TextStyle, View, Text } from 'react-native';
import { Button, ButtonType } from '../Button';
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
	onCloseCallback: () => void;
}
export interface ModalActions {
	onOpen: (config: Partial<ModalOpenConfig>) => void;
	onClose: () => void;
}

const Modal: ForwardRefRenderFunction<ModalActions> = (props, ref) => {
	const [state, setState] = useState<Partial<ModalOpenConfig>>({});
	const [visible, setVisible] = useState(false);
	const closeCallback = useRef<CallableFunction | null>(null);

	function onOpen(config: Partial<ModalOpenConfig>) {
		setState(config);
		setVisible(true);

		if(config.onCloseCallback) {
			closeCallback.current = config.onCloseCallback;
		}
	}

	function dispatchCloseCallback() {
		closeCallback.current?.();
		closeCallback.current = null;
	}

	function onClose() {
		setState({});
		setVisible(false);
		dispatchCloseCallback();
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

	const buttonType = useMemo<ButtonType | undefined>(() => {
		if(state.isError) {
			return 'error-button';
		} else if(state.isSuccess) {
			return 'success-button';
		}
		return undefined;
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

				<RenderValidation 
					validation={!!state.title} 
					validComponent={<Text style={getStyles(true)}>{state.title}</Text>}
				/>

				<RenderValidation 
					validation={!!state.description} 
					validComponent={<Text style={getStyles(false)}>{state.description}</Text>}
				/>

				<RenderValidation 
					validation={!!state.showButton} 
					validComponent={
						<Button 
							text={state.buttonText ?? ''}
							onPress={onClose}
							style={styles.button}
							type={buttonType}
						/>
					}
				/>
			</View>
		</ModalNative>
	);
};


export default forwardRef(Modal);