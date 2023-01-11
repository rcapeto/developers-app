import React, { createContext, FunctionComponent, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginError }  from '../../components/Error/LoginError';
import { ServerError }  from '../../components/Error/ServerError';
import { useModal } from '../../hooks/useModal';
import api, { setHeaderAPI } from '../../services/api';
import { apiRoutes } from '../../services/api-routes';
import { ICheckDeveloperResponse, IDeveloperMeResponse, ILoginResponse, IRegisterResponse } from '../../types/api-response';
import { type WithChildren } from '../../types/children';
import { AccountContextValues, LoginFunctionParams, RegisterFuncionParams } from '../../types/context';
import { useAccountReducer, AccountReducerTypes } from './AccountReducer';
import { asyncStorageConfig } from '../../config/async-storage';
import { unauthorizedLogout } from '../../utils/invalid-token-logout';
import { RegisterError } from '../../components/Error/RegisterError';
import { RegisterSuccess } from '../../components/Success/RegisterSuccess';

export const AccountContext = createContext({} as AccountContextValues);

export function AccountContextProvider({ children }: WithChildren) {
	const [state, dispatch] = useAccountReducer();
	const { openModal, closeModal } = useModal();

	async function me() {
		try {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
			
			const { data: response } = await api.get<IDeveloperMeResponse>(apiRoutes.developer.me);

			console.log(response);

		} catch(err) {
			if(err instanceof Error) {
				const isUnauthorized = err.message === 'unauthorized';

				if(isUnauthorized) {
					return unauthorizedLogout(logout);
				}
			}

			return openModal({
				component: ServerError as FunctionComponent,
				passProps: {
					onCloseModal: closeModal
				}
				
			});
		} finally {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
		}
	}

	async function login(params: LoginFunctionParams) {
		dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });

		try {
			const { data: response } = await api.post<ILoginResponse>(apiRoutes.account.login, params);

			if(response.data.error) {
				return openModal({
					component: LoginError as any,
					passProps: {
						errorMessage: response.data.message,
						onCloseModal: closeModal
					}
				});
			}

			const token = response.data.token;

			await handleCheckDeveloper(token);

		} catch(err) {
			return openModal({
				component: ServerError as FunctionComponent,
				passProps: {
					onCloseModal: closeModal
				}
				
			});
		}	finally {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
		}
	}

	async function register(params: RegisterFuncionParams) {
		try {
			dispatch({ type: AccountReducerTypes.TOGGLE_LOADING });
			
			const { data: response, status } = await api.post<IRegisterResponse | void>(apiRoutes.account.register, params);


			if(status === 201 && !response) {
				return openModal({
					component: RegisterSuccess as FunctionComponent,
					passProps: {
						onCloseModal: closeModal
					}
				});
			}

			if(response && response.data.error && response.data.message) {
				return openModal({
					component: RegisterError as FunctionComponent,
					passProps: {
						onCloseModal: closeModal,
						errorMessage: response.data.message
					}
				});
			} 

		} catch(err) {
			return openModal({
				component: ServerError as FunctionComponent,
				passProps: {
					onCloseModal: closeModal
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
			const { data: response } = await api.get<ICheckDeveloperResponse>(apiRoutes.developer.me, {
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

				AsyncStorage.setItem(
					asyncStorageConfig.token,
					token
				);
				
			}
		} catch(err) {
			AsyncStorage.removeItem(asyncStorageConfig.token);

			return openModal({
				component: ServerError as FunctionComponent,
				passProps: {
					onCloseModal: closeModal
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