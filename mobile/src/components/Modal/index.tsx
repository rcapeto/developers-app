import React, { forwardRef, ForwardRefRenderFunction, ReactNode, useImperativeHandle, useState } from 'react';
import { Modal as ModalNative, View } from 'react-native';
import { LoginError } from '../Error/LoginError';

import styles from './styles';

export interface ModalActions {
	openModal: () => void;
	closeModal: () => void;
	changeContent: (content: ReactNode) => void;
}

const Modal: ForwardRefRenderFunction<ModalActions> = (props, ref) => {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState<ReactNode>();

	useImperativeHandle(ref, () => {
		return {
			changeContent: setContent,
			closeModal: () => setVisible(false),
			openModal: () => setVisible(true)
		};
	});
	
	return(
		<ModalNative
			transparent
			animationType="slide"
			visible={visible}
			collapsable
		>
			<View style={styles.container}>
				{ content }
			</View>
		</ModalNative>
	);
};


export default forwardRef(Modal);