import React, { createContext } from 'react';
import api, { setHeaderAPI } from '../../services/api';
import { apiRoutes } from '../../services/api-routes';
import { type WithChildren } from '../../types/children';
import { AccountContextValues, LoginFunctionParams } from '../../types/context';
import { useAccountReducer } from './AccountReducer';

export const AccountContext = createContext({} as AccountContextValues);

export function AccountContextProvider({ children }: WithChildren) {
	const [state] = useAccountReducer();

	async function login(params: LoginFunctionParams) {
		try {
			const response = await api.post(apiRoutes.account.login, params);
			console.log('HERE', response.data);
		} catch(err) {
			console.log('HERE', err);
		}	
	}

	async function handleCheckUser(token: string) {
		setHeaderAPI('Authorization', `Bearer ${token}`);

		try {
			const { data: response } = await api.get(apiRoutes.developer.me);
			console.log('response token', response);
		} catch(err) {
			console.log('error token', err);
		}
	}

	return(
		<AccountContext.Provider 
			value={{
				developer: state.developer,
				isLoading: state.isLoading,
				isLogged: !!state.developer,
				login,
				checkingIfIsLogged: state.checkingIfIsLogged,
			}}
		>
			{ children }
		</AccountContext.Provider>
	);
}