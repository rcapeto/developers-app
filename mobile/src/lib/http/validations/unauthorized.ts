import { Alert, AlertButton, AlertOptions } from 'react-native';
import appConfig from '~/config/app';

type Callback = () => void;

export function checkIsUnauthorized(error: unknown, callback?: Callback) {
	if(error instanceof Error) {
		const isUnauthorized = error.message === 'unauthorized';

		if(isUnauthorized) {
			unauthorizedLogout(callback);
		}
	}
}

export function unauthorizedLogout(callback?: Callback) {
	const message = 'Notamos que seu token está inválido, por favor, por motivos de segurança refaça o seu Login';
	const buttons: AlertButton[] = [{ onPress: callback, style: 'cancel'}];
	const options: AlertOptions = { userInterfaceStyle: 'dark' };

	return Alert.alert(appConfig.teamName, message, buttons, options);
}