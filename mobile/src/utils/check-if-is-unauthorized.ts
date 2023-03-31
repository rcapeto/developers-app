interface Response {
   error?: boolean;
   cause?: string;
}

export function checkIfIsUnauthorized(response: Response) {
	const isError = Boolean(response?.error);
	const isUnauthorized = response?.cause && response.cause === 'unauthorized';
	return isError && isUnauthorized;
}