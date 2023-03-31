import { useInfiniteQuery } from 'react-query';
import { http } from '~/lib/http';

interface HookParams {
   perPage?: number;
   search?: string;
   onError?: () => void;
	logout: () => void;
}

interface GetDevelopersParams extends HookParams {
	page: number;
}

async function hookGetDevelopers(params: GetDevelopersParams) {
	const { page, perPage, search, onError, logout } = params;
	const getDevelopersParams = { page, perPage, search };

	try { 
		const { data: response, headers, page } = await http.developers().getDevelopers(getDevelopersParams, logout);

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
		onError?.();
	}
}

export function useDevelopersList(params: HookParams) {
	return useInfiniteQuery(
		['developers', params.search],
		async ({ 
			pageParam = 1,
		}) => await hookGetDevelopers({ ...params, page: pageParam }),
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