import { AccountContext } from '../contexts/account/AccountContext';
import { useContext } from 'react';

export function useAccount() {
	return useContext(AccountContext);
}