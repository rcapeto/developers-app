import axios from 'axios';
import { useTheme } from '~/hooks/useTheme';
import { checkIfIsUnauthorized } from '~/utils/check-if-is-unauthorized';

const { isAndroid } = useTheme();

const api = axios.create({
	baseURL: isAndroid ? 'http://192.168.15.46:3333' : 'http://localhost:3333',
	validateStatus: false,
});


api.interceptors.response.use(async response => {
	if(response.data && checkIfIsUnauthorized(response.data)) {
		throw new Error('unauthorized');
	}
	return response;
});


export function setHeaderAPI(key: string, value: string) {
	api.defaults.headers[key] = value;
}

export default api;