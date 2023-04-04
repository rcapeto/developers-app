import { EventaAccountEnum } from '~/utils/app/events/enum';
import { EventManager } from '~/utils/app/events/EventManager';

export function loginListeners(eventManager: EventManager) {
	eventManager.on(EventaAccountEnum.LOGIN, params => {
		console.log('disparou aqui', { params });
	});
}