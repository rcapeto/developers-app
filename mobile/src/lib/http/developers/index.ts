import { GetDeveloperParams, GetDevelopersParams, GetDevelopersResponse } from '~/lib/http/developers/types';
import api from '~/services/api';
import { apiRoutes } from '~/services/api-routes';
import { HttpError } from '~/lib/http/error';
import { checkIsUnauthorized } from '~/lib/http/validations/unauthorized';
import { HTTPErrorCallback } from '~/lib/http/types/api-response';
import { EventManager } from '~/utils/app/events/EventManager';
import { EventRequestErrorEnum } from '~/utils/app/events/enum';

export async function getDeveloper(params: GetDeveloperParams) {
	console.log(params);
	return null;  
}

export async function getDevelopers(params: Partial<GetDevelopersParams>, errorCallback?: HTTPErrorCallback) {
	const page = params.page ?? 1;
	const perPage = params.perPage ?? 10;
	const search = params.search ?? '';
	const eventManager = EventManager.getInstance();

	try {
		const { data, headers } = await api.get<GetDevelopersResponse>(apiRoutes.developer.all, {
			params: {
				perPage,
				page,
				search
			}
		});

		return { data, headers, page };

	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.DEVELOPERS);
		checkIsUnauthorized(err, errorCallback);
		throw new HttpError('Error get developers');
	}
}