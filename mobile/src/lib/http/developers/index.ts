import { 
	GetDeveloperParams, 
	GetDevelopersParams, 
	GetDevelopersResponse, 
	MeParams,
	MeResponse 
} from '~/lib/http/developers/types';
import api, { setHeaderAPI } from '~/services/api';
import { apiRoutes } from '~/services/api-routes';
import { HttpError } from '~/lib/http/error';
import { checkIsUnauthorized } from '~/lib/http/validations/unauthorized';
import { HTTPErrorCallback } from '~/lib/http/types/api-response';
import { EventManager } from '~/utils/app/events/EventManager';
import { EventRequestErrorEnum } from '~/utils/app/events/enum';

export async function one(params: GetDeveloperParams) {
	console.log(params);
	return null;  
}

export async function all(
	params: Partial<GetDevelopersParams>, 
	errorCallback?: HTTPErrorCallback,
	unauthorizedCallback?: HTTPErrorCallback,
) {
	const { page, perPage, search } = Object.assign({ page: 1, perPage: 10, search: '' }, params);
	const eventManager = EventManager.getInstance();

	try {
		const { data: response, headers } = await api.get<GetDevelopersResponse>(apiRoutes.developer.all, {
			params: {
				perPage,
				page,
				search
			}
		});

		if(response.data.error) {
			const message = response.data.message ?? '';
			eventManager.emmit(EventRequestErrorEnum.DEVELOPERS, { eventValue: { message }});
			errorCallback?.(message);
		}

		return { response, headers, page };

	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.DEVELOPERS);
		checkIsUnauthorized(err, unauthorizedCallback);
      
		throw new HttpError('Error get developers');
	}
}

export async function me(
	params?: Partial<MeParams>, 
	errorCallback?: HTTPErrorCallback,
	unauthorizedCallback?: HTTPErrorCallback,
) {
	const { token } = Object.assign({}, params);
	const bearerToken = token ? `Bearer ${token}` : undefined;
	const headers = bearerToken ? {'Authorization': bearerToken } : undefined;
	const eventManager = EventManager.getInstance();

	try {
		const { data: response } = await api.get<MeResponse>(apiRoutes.developer.me, { headers });

		if(response.data.developer) {
			setHeaderAPI('Authorization', bearerToken ?? '');
		}

		if(response.data && response.data.error) {
			const message = response.data.message ?? '';
			errorCallback?.(message);
		}

		return { response, token };

	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.ME, { 
			eventValue: {
				token: token ?? '',
			}
		});

		checkIsUnauthorized(err, unauthorizedCallback);

		throw new HttpError('Error get developer information');
	}
}