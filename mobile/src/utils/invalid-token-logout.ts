import { Alert } from 'react-native';

export function unauthorizedLogout(logout: () => void) {
	const teamName = 'Equipe Article App';
	const message = 'Notamos que seu token está inválido, por favor, por motivos de segurança refaça o seu Login';
	
	return Alert.alert(
		teamName,
		message,
		[{ onPress: logout, style: 'cancel'}]
	);
}