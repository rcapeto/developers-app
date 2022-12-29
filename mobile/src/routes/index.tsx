import React from 'react';
import { LoadingPage } from '../components/LoadingPage';
import { useAccount } from '../hooks/useAccount';
import { AuthenticationRoutes } from './authenticate-routes';

export default function Routes() {
	const { checkingIfIsLogged } = useAccount();

	if(checkingIfIsLogged) {
		return(
			<LoadingPage />
		);
	}

	return(
		<AuthenticationRoutes />
	);
}