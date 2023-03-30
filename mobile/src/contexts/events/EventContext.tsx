import React, { createContext } from 'react';
import { WithChildren } from '~/types/children';

import { EventContextValues } from '~/types/contexts/events';
import { EventManager } from '~/utils/app/events/EventManager';
import { startListeners } from '~/contexts/events/listeners';

export const EventContext = createContext({} as EventContextValues);

export function EventContextProvider({ children }: WithChildren) {
	const eventManager = EventManager.getInstance();
	
	startListeners(eventManager);

	return(
		<EventContext.Provider value={{ eventManager }}>
			{ children }
		</EventContext.Provider>
	);
}