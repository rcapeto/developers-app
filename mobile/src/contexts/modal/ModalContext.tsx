import React, { createContext } from 'react';

import { Modal } from '../../components/Modal';
import { WithChildren } from '../../types/children';

export const ModalContext = createContext({});

export function ModalContextProvider({ children }: WithChildren) {
	return(
		<ModalContext.Provider value={{}}>
			{ children }
			<Modal />
		</ModalContext.Provider>
	);
}