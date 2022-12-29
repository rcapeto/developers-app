import { useReducer } from 'react';
import { Developer } from '../../types/entitys';

export interface AccountReducerState {
   developer: Developer | null;
   isLoading: boolean;
	checkingIfIsLogged: boolean;
}

type AccountReducerActions = 
   { type: 'UPDATE_DEVELOPER', payload: { developer: Developer } } |
   { type: 'TOGGLE_LOADING' } |
   { type: 'TOGGLE_CHECKING_IF_IS_LOGGED' }

const initialReducer: AccountReducerState = {
	developer: null,
	isLoading: false,
	checkingIfIsLogged: false,
};

function reducer(state: AccountReducerState, action: AccountReducerActions) {
	switch(action.type) {
	case 'UPDATE_DEVELOPER':
		return {
			...state,
			developer: action.payload.developer
		};
	case 'TOGGLE_LOADING':
		return {
			...state,
			isLoading: !state.isLoading
		};
	case 'TOGGLE_CHECKING_IF_IS_LOGGED':
		return {
			...state,
			checkingIfIsLogged: !state.checkingIfIsLogged
		};
	default:
		return state;
	}
}


export function useAccountReducer() {
	return useReducer(reducer, initialReducer);
}