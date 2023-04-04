import { useInfiniteQuery } from 'react-query';
import { http } from '~/lib/http';

interface HookParams {
   perPage?: number;
   search?: string;
   onError?: (message?: string) => void;
	logout: () => void;
}

interface GetPublicationsParams extends HookParams {
	page: number;
}

async function hookGetPublications(params: GetPublicationsParams) {
	const { page, perPage, search, onError, logout } = params;
	const getPublicationsParams = { page, perPage, search };

	try { 
		const { response, headers, page } = await http.publications().all(
			getPublicationsParams,
			onError, 
			logout
		);

		const totalPages = response?.data?.totalPages ?? 1;
		const nextPage = page < totalPages ? page + 1 : page;
		
		return {
			publications: response?.data?.publications ?? [],
			totalPages,
			nextPage,
			hasNextPage: nextPage !== page,
			count: headers['x-total-count'] ?? '0',
		};

	} catch(err) {
		onError?.();
	}
}

export function usePublicatonsList(params: HookParams) {
	return useInfiniteQuery(
		['developers', params.search],
		async ({ 
			pageParam = 1,
		}) => await hookGetPublications({ ...params, page: pageParam }),
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