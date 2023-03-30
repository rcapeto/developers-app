import React, { createContext, useRef } from 'react';
import { Alert } from 'react-native';

import { WithChildren } from '~/types/children';
import { AppNavigationContextValues, ShowAlertConfig } from '~/types/contexts/app-navigation';
import Modal, { ModalOpenConfig, ModalActions } from '~/components/Modal';
import appConfig from '~/config/app';

export const AppNavigationContext = createContext({} as AppNavigationContextValues);

export function AppNavigationProvider({ children }: WithChildren) {
	const modalRef = useRef<ModalActions>(null);

	function openDialogBottom(config: Partial<ModalOpenConfig>) {
		const modal = modalRef.current;
		modal?.onOpen(config);
	}

	function closeDialogBottom() {
		const modal = modalRef.current;
		modal?.onClose();
	}


	function showAlert(config: Partial<ShowAlertConfig>) {
		const { buttons, message, options } = config;
		return Alert.alert(appConfig.teamName, message, buttons, options);
	}

	return(
		<AppNavigationContext.Provider 
			value={{ 
				openDialogBottom, 
				closeDialogBottom, 
				showAlert 
			}}>
			{ children }
			<Modal ref={modalRef} />
		</AppNavigationContext.Provider>
	);
}