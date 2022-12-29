export class TextValidation {
	static hasUppercase(text: string): boolean {
		const regex = /[A-Z]/;
		return regex.test(text);
	}

	static hasLowercase(text: string): boolean {
		const regex = /[a-z]/;
		return regex.test(text);
	}

	static hasSpecialChars(text: string): boolean {
		const regex = /\W/;
		return regex.test(text);
	}

	static hasNumber(text: string): boolean {
		const regex = /\d/;
		return regex.test(text);
	}

	static hasLenght(text: string, length: number): boolean {
		return text.length >= length;
	}
}