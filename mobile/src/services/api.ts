import axios from 'axios';
import { useTheme } from '../hooks/useTheme';

const { isAndroid } = useTheme();

const api = axios.create({
	baseURL: isAndroid ? 'http://192.168.0.2:3333' : 'http://localhost:3333',
	validateStatus: false,
});

export function setHeaderAPI(key: string, value: string) {
	api.defaults.headers[key] = value;
}

export default api;