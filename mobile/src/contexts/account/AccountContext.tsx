import React, { createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { LoginError }  from '~/components/Error/LoginError';
import { RegisterError } from '~/components/Error/RegisterError';
import { ServerError }  from '~/components/Error/ServerError';

import api, { setHeaderAPI } from '~/services/api';
import { apiRoutes } from '~/services/api-routes';

import { LoginParams, RegisterParams, LoginResponse, RegisterResponse } from '~/lib/http/account/types';
import { MeResponse } from '~/lib/http/developers/types';
import { type WithChildren } from '~/types/children';

import { AccountContextValues, } from '~/types/contexts/account';
import { useAccountReducer, AccountReducerTypes } from './AccountReducer';
import { asyncStorageConfig } from '~/config/async-storage';
import { unauthorizedLogout } from '~/lib/http/validations/unauthorized';

import { useAppNavigation } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';

export const AccountContext = createContext({} as AccountContextValues);

const { colors } = useTheme();

export function AccountContextProvider({ children }: WithChildren) {
	const [state, dispatch] = useAccountReducer();
	const appNavigation = useAppNavigation();
	const navigation = useNavigation();

	async function me() {
		try {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
			
			const { data: response } = await api.get<MeResponse>(apiRoutes.developer.me);

			console.log(response);

		} catch(err) {
			if(err instanceof Error) {
				const isUnauthorized = err.message === 'unauthorized';

				if(isUnauthorized) {
					return unauthorizedLogout(logout);
				}
			}

			return appNavigation.openDialogBottom({
				Component: ServerError,
				isError: true,
				passProps: {
					onCloseModal: appNavigation.closeDialogBottom,
				}
			});

		} finally {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
		}
	}

	async function login(params: LoginParams) {
		dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });

		try {
			const { data: response } = await api.post<LoginResponse>(apiRoutes.account.login, params);

			if(response.data.error) {
				return appNavigation.openDialogBottom({
					Component: LoginError,
					passProps: {
						errorMessage: response.data.message,
						onCloseModal: appNavigation.closeDialogBottom,
					}
				});
			}

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

	async function register(params: RegisterParams) {
		try {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
			
			const { data: response, status } = await api.post<RegisterResponse>(apiRoutes.account.register, params);


			if(status === 201 && !response) {
				appNavigation.openDialogBottom({
					title: 'Usuário cadastrado com sucesso!',
					showButton: true,
					isSuccess: true,
					buttonText: 'Ok!',
					icon: <AntDesign name="checkcircle" color={colors.green[500]} size={40} />,
				});

				return navigation.navigate('login');
			}

			if(response && response.data.error && response.data.message) {
				return appNavigation.openDialogBottom({
					Component: RegisterError,
					passProps: {
						onCloseModal: appNavigation.closeDialogBottom,
						errorMessage: response.data.message
					}
				});
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
		const bearerToken = `Bearer ${token}`;

		try {
			const { data: response } = await api.get<MeResponse>(apiRoutes.developer.me, {
				headers: {
					'Authorization': bearerToken
				}
			});

			if(response.data.developer) {
				setHeaderAPI('Authorization', bearerToken);
		
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