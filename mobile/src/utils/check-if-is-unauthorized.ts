import { ErrorResponse } from '~/lib/http/types/api-response';

export function checkIfIsUnauthorized(response: ErrorResponse) {
	const isError = Boolean(response?.error);
	const isUnauthorized = response?.cause && response.cause === 'unauthorized';
	return isError && isUnauthorized;
}