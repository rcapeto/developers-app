import { Alert } from 'react-native';
import appConfig from '../config/app';

export function unauthorizedLogout(logout: () => void) {
	const message = 'Notamos que seu token está inválido, por favor, por motivos de segurança refaça o seu Login';
	
	return Alert.alert(
		appConfig.teamName,
		message,
		[{ onPress: logout, style: 'cancel'}],
		{
			userInterfaceStyle: 'dark'
		}
	);
}