import { 
	GetPublicationsParams , 
	GetPublicationsResponse, 
	GetPublicationParams, 
	GetPublicationResponse,
	PostPublicationParams,
	PostPublicationResponse
} from '~/lib/http/publications/types';
import api from '~/services/api';
import { apiRoutes } from '~/services/api-routes';
import { EventRequestErrorEnum } from '~/utils/app/events/enum';
import { EventManager } from '~/utils/app/events/EventManager';
import { HTTPErrorCallback } from '~/lib/http/types/api-response';
import { checkIsUnauthorized } from '~/lib/http/validations/unauthorized';
import { HttpError } from '~/lib/http/error';

export async function all(
	params?: Partial<GetPublicationsParams>,
	errorCallback?: HTTPErrorCallback,
	unauthorizedCallback?: HTTPErrorCallback,
) {
	const { page, perPage, search } = Object.assign({ page: 1, perPage: 10, search: '' }, params);
	const eventManager = EventManager.getInstance();

	try {
		const { data: response, headers } = await api.get<GetPublicationsResponse>(apiRoutes.publication.all, {
			params: {
				perPage,
				page,
				search
			}
		});

		if(response && response.data && response.data.error) {
			const message = response.data.message ?? '';
			eventManager.emmit(EventRequestErrorEnum.PUBLICATONS, { eventValue: { message }});
			errorCallback?.(message);
		}

		return { response, headers, page };

	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.PUBLICATONS);
		checkIsUnauthorized(err, unauthorizedCallback);
		throw new HttpError('Error get publications');
	} 
}

export async function findOne(
	params: GetPublicationParams,
	errorCallback?: HTTPErrorCallback,
	unauthorizedCallback?: HTTPErrorCallback,
) {
	const eventManager = EventManager.getInstance();
	const publicationId = params.publicationId;

	try {
		const { data: response } = await api.get<GetPublicationResponse>(apiRoutes.publication.findOne(publicationId));

		if(response?.data.error) {
			const message = response.data.message ?? '';
			eventManager.emmit(EventRequestErrorEnum.PUBLICATION, { eventValue: { message, publicationId }});
			errorCallback?.(message);
		}

		return { response };

	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.PUBLICATION, { 
			eventValue: {
				publicationId
			}
		});
		checkIsUnauthorized(err, unauthorizedCallback);
		throw new HttpError('Error get publications');
	}
}

export async function create(
	params: PostPublicationParams,
	errorCallback?: HTTPErrorCallback,
	unauthorizedCallback?: HTTPErrorCallback,
) {
	const eventManager = EventManager.getInstance();
	const { description, thumbnail, title } = params;
	const formData = new FormData();

	formData.append('title', title);
	formData.append('description', description);
	formData.append('thumbnail', {
		name: `image-${thumbnail}.jpg`,
		type: 'image/jpg',
		uri: thumbnail,
	});

	try {
		const { data: response } = await api.post<PostPublicationResponse>(apiRoutes.publication.create, formData);

		if(response && response.data && response.data.error) {
			const message = response.data.message ?? '';
			errorCallback?.(message);
			eventManager.emmit(EventRequestErrorEnum.CREATE_PUBLICATION, {
				eventValue: {
					...params,
					message,
				}
			});
		}

		return { response };
		
	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.CREATE_PUBLICATION, {
			eventValue: {
				...params,
			}
		});
		checkIsUnauthorized(err, unauthorizedCallback);
		throw new HttpError('Error create a publication');
	}
}