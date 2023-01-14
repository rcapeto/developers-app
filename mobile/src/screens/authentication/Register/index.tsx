import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Layout } from '../../../components/Layout';
import { Input, InputProps } from '../../../components/Input';
import styles from './styles';
import { Button } from '../../../components/Button';
import { useTheme } from '../../../hooks/useTheme';
import { useAccount } from '../../../hooks/useAccount';
import { useAppNavigation } from '../../../hooks/useAppNavigation';

interface FormValues {
	username: string;
	password: string;
   confirm_password: string;
   name: string;
}

type FormValueName = keyof FormValues;

const registerSchema = yup.object().shape({
	name: yup.string().required('Nome é obrigatório'),
	username: yup.string().required('Usuário é obrigatório'),
	password: yup.string().required('Senha é obrigatório').min(6, 'No mínimo 6 caractéres'),
	confirm_password: yup.string().oneOf(
		[null, yup.ref('password')], 
		'As senhas precisam ser iguais!'
	),
});

const { isAndroid } = useTheme();

export default function Register() {
	const { register } = useAccount();
	const appNavigation = useAppNavigation();
	const navigation = useNavigation();

	const [errorCreatePassword, setErrorCreatePassword] = useState(false);
	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues: {
			name: '',
			username: '',
			password: '',
			confirm_password: ''
		},
		resolver: yupResolver(registerSchema),
	});

	async function handleRegister(values: FormValues) {
		if(errorCreatePassword) {
			const message = 'Notamos que sua senha não possui os requisitos de segurança, por favor modifique sua senha para realizar o cadastro';

			return appNavigation.showAlert({
				message,
				options: { userInterfaceStyle: 'dark' },
			});
		}
		await register(values);
	}

	const inputs = useMemo<InputProps[]>(() => {
		return [
			{
				name: 'name',
				label: 'Digite o seu nome',
				autoCapitalize: 'none',
			},
			{
				name: 'username',
				label: 'Digite o seu usuário',
				autoCorrect: false,
			},
			{
				name: 'password',
				label: 'Digite uma senha',
				isPassword: true,
				showPasswordHelp: true,
				autoCorrect: false,
				onErrorValidation: function(error) {
					setErrorCreatePassword(error);
				}
			},
			{
				name: 'confirm_password',
				label: 'Confirmação de senha',
				isPassword: true,
				autoCorrect: false,
			}
		];
	}, []);

	return(
		<Layout activeHeader headerProps={{ title: 'Cadastre-se', showBack: true }}>
			<ScrollView 
				style={styles.container} 
				contentInset={{ bottom: !isAndroid ? 75 : 0 }}
				showsVerticalScrollIndicator={false}
			>
				{
					inputs.map(input => (
						<Controller
							key={input.name}
							control={control}
							rules={{
								required: true,
							}}
							name={input.name as FormValueName}
							render={({ field: { onChange, value, onBlur } }) => (
								<Input 
									{...input}
									onChangeText={onChange}
									errorMessage={errors[input.name]?.message}
									value={value}
									onBlur={onBlur}
								/>
							)}
						/>
					))
				}

				<View style={styles.buttonContainer}>
					<Button 
						text='Cadastrar'
						onPress={handleSubmit(handleRegister)}
					/>
				</View>
			</ScrollView>
		</Layout>
	);
}