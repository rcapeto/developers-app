import { useReducer } from 'react';
import { Developer } from '~/types/entitys';

export enum AccountReducerTypes {
	UPDATE_DEVELOPER = 'UPDATE_DEVELOPER',
	TOGGLE_LOADING = 'TOGGLE_LOADING',
	TOGGLE_CHECKING_IF_IS_LOGGED = 'TOGGLE_CHECKING_IF_IS_LOGGED',
}
export interface AccountReducerState {
   developer: Developer | null;
   isLoading: boolean;
	checkingIfIsLogged: boolean;
}

type AccountReducerActions = 
   { type: AccountReducerTypes.UPDATE_DEVELOPER, payload: { developer: Developer | null } } |
   { type: AccountReducerTypes.TOGGLE_LOADING } |
   { type: AccountReducerTypes.TOGGLE_CHECKING_IF_IS_LOGGED }

const initialReducer: AccountReducerState = {
	developer: null,
	isLoading: false,
	checkingIfIsLogged: false,
};

function reducer(state: AccountReducerState, action: AccountReducerActions) {
	switch(action.type) {
	case AccountReducerTypes.UPDATE_DEVELOPER:
		return {
			...state,
			developer: action.payload.developer
		};
	case AccountReducerTypes.TOGGLE_LOADING:
		return {
			...state,
			isLoading: !state.isLoading
		};
	case AccountReducerTypes.TOGGLE_CHECKING_IF_IS_LOGGED:
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