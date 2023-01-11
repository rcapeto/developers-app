import React, { createContext, FunctionComponent, PureComponent, useRef } from 'react';

import Modal, { ModalActions } from '../../components/Modal';
import { WithChildren } from '../../types/children';

export interface OpenModalConfig {
	component: FunctionComponent;
	passProps? : Record<string, unknown>;
}

interface ModalContextValues {
	closeModal: () => void;
	openModal: (config: OpenModalConfig) => void;
}

export const ModalContext = createContext({} as ModalContextValues);

export function ModalContextProvider({ children }: WithChildren) {
	const modalRef = useRef<ModalActions>(null);

	function openModal(config: OpenModalConfig) {
		if(modalRef.current) {
			modalRef.current.openModal(config);
		}
	}

	function closeModal() {
		modalRef.current?.closeModal();
	}

	return(
		<ModalContext.Provider 
			value={{
				closeModal,
				openModal
			}}
		>
			{ children }
			<Modal 
				ref={modalRef}
			/>
		</ModalContext.Provider>
	);
}