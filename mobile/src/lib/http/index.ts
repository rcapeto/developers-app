import { getDevelopers, me } from '~/lib/http/developers';
import { login, register } from '~/lib/http/account';

export class Http { 
	constructor() {
		console.log('Create HTTP instance');
	}

	developers() {
		return {
			getDevelopers,
			me,
		};
	}

	account() {
		return { login, register };
	}
}

export const http = new Http();