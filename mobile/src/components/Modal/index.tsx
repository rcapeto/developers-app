import React, { 
	cloneElement,
	forwardRef, 
	ForwardRefRenderFunction, 
	FunctionComponent, 
	ReactNode, 
	useImperativeHandle, 
	useMemo, 
	useState 
} from 'react';
import { Modal as ModalNative, View } from 'react-native';
import { OpenModalConfig } from '../../contexts/modal/ModalContext';

import styles from './styles';

export interface ModalActions {
	openModal: (config: OpenModalConfig) => void;
	closeModal: () => void;
}

const Modal: ForwardRefRenderFunction<ModalActions> = (props, ref) => {
	const [visible, setVisible] = useState(false);
	const [content, setContent] = useState<ReactNode>();

	function openModal(config: OpenModalConfig) {
		const Component = config.component;
		setContent(<Component {...config.passProps}/>);
		setVisible(true);
	}
	function closeModal() {
		setContent(undefined);
		setVisible(false);
	}

	useImperativeHandle(ref, () => {
		return { closeModal, openModal };
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