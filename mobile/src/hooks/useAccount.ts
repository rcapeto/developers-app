import { useContext } from 'react';

import { AccountContext } from '~/contexts/account/AccountContext';

export function useAccount() {
	return useContext(AccountContext);
}