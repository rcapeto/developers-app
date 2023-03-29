import { useInfiniteQuery } from 'react-query';
import api from '~/services/api';
import { apiRoutes } from '~/services/api-routes';
import { IAppDataResponseDevelopers } from '~/types/api-response';

import { unauthorizedLogout } from '~/utils/invalid-token-logout';

interface HookParams {
   perPage?: number;
   search?: string;
   onError?: () => void;
   logout: () => void;
}

interface GetDevelopersParams extends HookParams {
	page: number;
}

async function getDevelopers(params: GetDevelopersParams) {
	const page = params.page;
	const perPage = params.perPage ?? 10;
	const search = params.search ?? '';

	try {
		const { data: response, headers } = await api.get<IAppDataResponseDevelopers>(apiRoutes.developer.all, {
			params: {
				perPage,
				page,
				search
			}
		});

		const totalPages = response?.data?.totalPages ?? 1;
		const nextPage = page < totalPages ? page + 1 : page;
		
		return {
			developers: response?.data?.developers ?? [],
			totalPages,
			nextPage,
			hasNextPage: nextPage !== page,
			count: headers['x-total-count'] ?? '0',
		};
	} catch(err) {
		if(err instanceof Error) {
			const isUnauthorized = err.message === 'unauthorized';

			if(isUnauthorized) {
				unauthorizedLogout(params.logout);
			}
		}
		params?.onError?.();
	}
}

export function useDevelopersList(params: HookParams) {
	return useInfiniteQuery(
		['developers', params.search],
		async ({ 
			pageParam = 1,
		}) => await getDevelopers({ ...params, page: pageParam }),
		{
			getNextPageParam: (lastPage) => {
				if(lastPage?.hasNextPage) {
					return lastPage?.nextPage;
				} 

				return undefined;
			},
			keepPreviousData: true,
		}
	);
}