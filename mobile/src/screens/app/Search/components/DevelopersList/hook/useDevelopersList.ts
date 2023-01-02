import { useQuery } from 'react-query';
import api from '../../../../../../services/api';
import { apiRoutes } from '../../../../../../services/api-routes';
import { IAppDataResponseDevelopers } from '../../../../../../types/api-response';

import { unauthorizedLogout } from '../../../../../../utils/invalid-token-logout';

interface HookParams {
   page?: number;
   perPage?: number;
   search?: string;
   onError?: () => void;
   logout: () => void;
}

export function useDevelopersList(params: HookParams) {
	const page = params.page ?? 1;
	const perPage = params.perPage ?? 10;
	const search = params.search ?? '';

	return useQuery(['developers', page], async () => {
		try {
			const { data: response, headers } = await api.get<IAppDataResponseDevelopers>(apiRoutes.developer.all, {
				params: {
					perPage,
					page,
					search
				}
			});

			return { response, headers };
		} catch(err) {
			if(err instanceof Error) {
				const isUnauthorized = err.message === 'unauthorized';

				if(isUnauthorized) {
					unauthorizedLogout(params.logout);
				}
			}

			params?.onError?.();
		}
	});
}