import { AlertButton, AlertOptions } from 'react-native';
import { ModalOpenConfig } from '~/components/Modal';
 
export interface ShowAlertConfig {
   message: string;
   buttons: AlertButton[];
   options: AlertOptions;
}

export interface AppNavigationContextValues {
   openDialogBottom: (config: Partial<ModalOpenConfig>) => void;
   closeDialogBottom: () => void;
   showAlert: (config: Partial<ShowAlertConfig>) => void;
}