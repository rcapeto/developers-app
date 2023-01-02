import React, { createContext, ReactNode, useRef } from 'react';

import Modal, { ModalActions } from '../../components/Modal';
import { WithChildren } from '../../types/children';

interface OpenModalConfig {
	component: ReactNode;
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
			modalRef.current.openModal();
			modalRef.current.changeContent(config.component);
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