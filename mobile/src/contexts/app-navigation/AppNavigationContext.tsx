import React, { createContext, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { WithChildren } from '~/types/children';
import { AppNavigationContextValues, AppNavigationState, ShowAlertConfig } from '~/types/context';
import Modal, { ModalOpenConfig, ModalActions } from '~/components/Modal';
import appConfig from '~/config/app';

export const AppNavigationContext = createContext({} as AppNavigationContextValues);

export function AppNavigationProvider({ children }: WithChildren) {
	const navigation = useNavigation();
	const modalRef = useRef<ModalActions>(null);

	function openDialogBottom(config: Partial<ModalOpenConfig>) {
		const modal = modalRef.current;
		modal?.onOpen(config);
	}

	function closeDialogBottom() {
		const modal = modalRef.current;
		modal?.onClose();
	}

	function push(config: AppNavigationState) {
		navigation.navigate('appNavigation', config);
	}

	function showAlert(config: Partial<ShowAlertConfig>) {
		const { buttons, message, options } = config;
		return Alert.alert(appConfig.teamName, message, buttons, options);
	}

	return(
		<AppNavigationContext.Provider value={{ openDialogBottom, push, closeDialogBottom, showAlert }}>
			{ children }
			<Modal ref={modalRef} />
		</AppNavigationContext.Provider>
	);
}