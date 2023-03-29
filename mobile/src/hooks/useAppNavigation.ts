import { useContext } from 'react';

import { AppNavigationContext } from '~/contexts/app-navigation/AppNavigationContext';

export function useAppNavigation() {
	return useContext(AppNavigationContext);
}