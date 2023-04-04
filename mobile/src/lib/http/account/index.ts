import { LoginParams, LoginResponse, RegisterParams, RegisterResponse } from '~/lib/http/account/types';
import { HTTPErrorCallback } from '~/lib/http/types/api-response';
import { EventManager } from '~/utils/app/events/EventManager';
import { EventRequestErrorEnum } from '~/utils/app/events/enum';
import api from '~/services/api';
import { apiRoutes } from '~/services/api-routes';
import { HttpError } from '~/lib/http/error';

export async function login(params: LoginParams, errorCallback?: HTTPErrorCallback) {
	const eventManager = EventManager.getInstance();

	try {
		const { data: response } = await api.post<LoginResponse>(apiRoutes.account.login, params);

		if(response.data.error) {
			errorCallback?.(response.data.message ?? '');
		}

		return { response };

	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.LOGIN);
		throw new HttpError(`Error application login: ${(err as Error).message}`);
	}
}

export async function register(params: RegisterParams, errorCallback?: HTTPErrorCallback) {
	const eventManager = EventManager.getInstance();

	try {
		const { data: response, status } = await api.post<RegisterResponse>(apiRoutes.account.register, params);
		const success = status === 201 && !response;

		if(response && response.data.error && response.data.message) {
			errorCallback?.(response.data.message ?? '');
		} 

		return { success };

	} catch(err) {
		eventManager.emmit(EventRequestErrorEnum.REGISTER, { 
			eventValue: { ...params },
		});
		throw new HttpError(`Error application register: ${(err as Error).message}`);
	} 
}