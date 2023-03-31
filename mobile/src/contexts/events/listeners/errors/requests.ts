import { EventRequestErrorEnum } from '~/utils/app/events/enum';
import { EventManager } from '~/utils/app/events/EventManager';

export function errorsListeners(eventManager: EventManager) {
	eventManager.on(EventRequestErrorEnum.DEVELOPERS, () => {
		const date = new Date();
		const dateSTR = date.toISOString();
		
		console.error(`Error get developers date: ${dateSTR}`);
	});
}