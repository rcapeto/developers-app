import { EventManager } from '~/utils/app/events/EventManager';

import { loginListeners } from '~/contexts/events/listeners/authentication/login';
import { errorsListeners } from '~/contexts/events/listeners/errors/requests';

export function startListeners(eventManager: EventManager) {
	const listeners = [
		loginListeners,
		errorsListeners,
	];

	for(const listener of listeners) {
		listener.call(null, eventManager);
	}
}