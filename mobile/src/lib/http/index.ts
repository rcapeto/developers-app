import { 
	getDevelopers,
} from '~/lib/http/developers';

export class Http { 
	constructor() {
		console.log('Create HTTP instance');
	}

	developers() {
		return {
			getDevelopers,
		};
	}
}

export const http = new Http();