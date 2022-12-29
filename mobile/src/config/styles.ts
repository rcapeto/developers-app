import { Platform } from 'react-native';

export const colors = {
	gray: {
		950: '#09090A',
		900: '#121214',
		800: '#202024',
		600: '#323238',
		300: '#8D8D99',
		200: '#C4C4CC',
	},
	green: {
		500: '#047C3F'
	},
	purple: {
		300: '#996DFF',
		500: '#8257e6',
	},
	red: {
		500: '#DB4437',
	},
	white: '#FFFFFF'
};

export const fontSize = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 20,
	xl: 24,
};

export const isAndroid = Platform.OS === 'android';

export const fontFamily = {
	heading: 'Poppins_700Bold',
	body: 'Poppins_400Regular',
	medium: 'Poppins_500Medium'
};