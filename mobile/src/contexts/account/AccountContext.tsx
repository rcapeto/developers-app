import React, { createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { LoginError }  from '~/components/Error/LoginError';
import { RegisterError } from '~/components/Error/RegisterError';
import { ServerError }  from '~/components/Error/ServerError';


import { LoginParams, RegisterParams } from '~/lib/http/account/types';
import type { WithChildren } from '~/types/children';

import { AccountContextValues, } from '~/types/contexts/account';
import { useAccountReducer, AccountReducerTypes } from './AccountReducer';
import { asyncStorageConfig } from '~/config/async-storage';

import { useAppNavigation } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';
import { http } from '~/lib/http';

export const AccountContext = createContext({} as AccountContextValues);

const { colors } = useTheme();

export function AccountContextProvider({ children }: WithChildren) {
	const [state, dispatch] = useAccountReducer();
	const appNavigation = useAppNavigation();
	const navigation = useNavigation();

	function handleMeError() {
		appNavigation.openDialogBottom({
			Component: ServerError,
			isError: true,
			passProps: {
				onCloseModal: appNavigation.closeDialogBottom,
			}
		});
	}

	async function me() {
		try {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });

			const { response } = await http.developers().me(undefined, handleMeError, logout);
			
			console.log(response);

		} catch(err) {
			handleMeError();
		} finally {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
		}
	}

	function handleLoginError(message?: string) {
		appNavigation.openDialogBottom({
			Component: LoginError,
			passProps: {
				errorMessage: message ?? '',
				onCloseModal: appNavigation.closeDialogBottom,
			}
		});
	}

	async function login(params: LoginParams) {
		dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });

		try {
			const { response } = await http.account().login(params, handleLoginError);

			const token = response.data.token;

			if(token) {
				await handleCheckDeveloper(token);
			}

		} catch(err) {
			return appNavigation.openDialogBottom({
				Component: ServerError,
				passProps: {
					onCloseModal: appNavigation.closeDialogBottom,
				}
			});
		}	finally {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
		}
	}

	function handleRegisterError(message?: string) {
		appNavigation.openDialogBottom({
			Component: RegisterError,
			passProps: {
				onCloseModal: appNavigation.closeDialogBottom,
				errorMessage: message ?? '',
			}
		});
	}

	async function register(params: RegisterParams) {
		try {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });

			const { success } = await http.account().register(params, handleRegisterError);
			
			if(success) {
				appNavigation.openDialogBottom({
					title: 'Usuário cadastrado com sucesso!',
					showButton: true,
					isSuccess: true,
					buttonText: 'Ok!',
					icon: <AntDesign name="checkcircle" color={colors.green[500]} size={40} />,
				});

				return navigation.navigate('login');
			}

		} catch(err) {
			return appNavigation.openDialogBottom({
				Component: ServerError,
				passProps: {
					onCloseModal: appNavigation.closeDialogBottom,
				}
			});
		} finally {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
		}
	}

	async function logout() {
		await AsyncStorage.removeItem(asyncStorageConfig.token);

		dispatch({
			type: AccountReducerTypes.UPDATE_DEVELOPER, 
			payload: { developer: null }
		});
	}

	async function handleCheckDeveloper(token: string) {
		try {
			const { response } = await http.developers().me({ token });

			if(response.data.developer) {
				const { developer } = response.data;

				dispatch({
					type: AccountReducerTypes.UPDATE_DEVELOPER, 
					payload: { developer }
				});

				AsyncStorage.setItem(asyncStorageConfig.token, token);
			}
		} catch(err) {
			AsyncStorage.removeItem(asyncStorageConfig.token);

			return appNavigation.openDialogBottom({
				Component: ServerError,
				passProps: {
					onCloseModal: appNavigation.closeDialogBottom,
				}
			});
		}
	}

	useEffect(() => {
		dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });

		AsyncStorage.getItem(asyncStorageConfig.token).then(async token => {
			if(token) {
				await handleCheckDeveloper(token);
			}
		}).finally(() => {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
		});
	}, []);

	return(
		<AccountContext.Provider 
			value={{
				developer: state.developer,
				isLoading: state.isLoading,
				isLogged: !!state.developer,
				login,
				logout,
				checkingIfIsLogged: state.checkingIfIsLogged,
				register,
				me,
			}}
		>
			{ children }
		</AccountContext.Provider>
	);
}