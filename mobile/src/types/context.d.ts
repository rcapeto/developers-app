import { FunctionComponent } from 'react';
import { AlertButton, AlertOptions } from 'react-native';
import { ModalOpenConfig } from '~/components/Modal';
import { AccountReducerState } from '~/contexts/account/AccountReducer';

export interface LoginFunctionParams {
   username: string;
   password: string;
}

export interface RegisterFuncionParams {
   name: string;
   confirm_password: string;
   password: string;
   username: string;
}

export interface AccountContextValues extends AccountReducerState {
   isLogged: boolean;
   login(params: LoginFunctionParams): Promise<void>;
   logout(): void;
   register(params: RegisterFuncionParams): Promise<void>;
   me(): Promise<void>;
 }
export interface AppNavigationState {
   Component?: FunctionComponent;
   title?: string;
   passProps?: Record<string, string>;
}

export interface ShowAlertConfig {
   message: string;
   buttons: AlertButton[];
   options: AlertOptions;
}

export interface AppNavigationContextValues {
   push: (config: AppNavigationState) => void;
   openDialogBottom: (config: Partial<ModalOpenConfig>) => void;
   closeDialogBottom: () => void;
   showAlert: (config: Partial<ShowAlertConfig>) => void;
}