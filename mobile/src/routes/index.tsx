import React from 'react';
import { LoadingPage } from '~/components/LoadingPage';
import { useAccount } from '~/hooks/useAccount';
import { AuthenticationRoutes } from './authenticate-routes';
import { AppRoutes } from './app/stack-routes';

export default function Routes() {
	const { checkingIfIsLogged, isLogged } = useAccount();

	if(checkingIfIsLogged) {
		return(
			<LoadingPage />
		);
	}

	return isLogged ? <AppRoutes /> : <AuthenticationRoutes />;
}