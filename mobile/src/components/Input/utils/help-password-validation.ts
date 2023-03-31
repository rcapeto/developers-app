type HelpPasswordValidationTypes = 'uppercase' | 'lowercase' | 'specialChars' | 'number' | 'hasLenght';

type HelpPasswordValidationResponse = (text: string, length?: number) => boolean;

export function helpPasswordValidation(type: HelpPasswordValidationTypes): HelpPasswordValidationResponse {
	return function(text: string, length?: number) {
		let regex;

		switch(type) {
		case 'uppercase':
			regex = /[A-Z]/;
			return regex.test(text);
		case 'lowercase':
			regex = /[a-z]/;
			return regex.test(text);
		case 'specialChars':
			regex = /\W/;
			return regex.test(text);
		case 'number':
			regex = /\d/;
			return regex.test(text);
		case 'hasLenght':
			return text.length >= (length ?? 0);
		default:
			return false;
		}
	};
}