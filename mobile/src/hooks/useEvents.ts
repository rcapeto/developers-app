import { useContext } from 'react';
import { EventContext } from '~/contexts/events/EventContext';

export function useEvents() {
	return useContext(EventContext);
}