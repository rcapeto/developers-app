import * as developersRequest from '~/lib/http/developers';
import { login, register } from '~/lib/http/account';
import * as publicationsRequest from '~/lib/http/publications';

export class Http { 
	private static INSTANCE: Http;

	private constructor() {
		console.log('>>> Create: [HTTP library]');
	}

	public static getInstance() {
		if(!this.INSTANCE) {
			this.INSTANCE = new Http();
		}

		return this.INSTANCE;
	}

	developers() {
		return {
			all: developersRequest.all,
			me: developersRequest.me,
			findOne: developersRequest.findOne,
		};
	}

	account() {
		return { login, register }; 
	}

	publications() {
		return {
			all: publicationsRequest.all,
			findOne: publicationsRequest.findOne,
		};
	}
}

export const http = Http.getInstance();