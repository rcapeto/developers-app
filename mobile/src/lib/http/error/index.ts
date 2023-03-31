export class HttpError {
	type: string;
	message: string;
   
	constructor(message: string) {
		this.type = 'http-error';
		this.message = message;
	}
}