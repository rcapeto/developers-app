import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import{ z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Layout } from '~/components/Layout';
import { Input, InputProps } from '~/components/Input';
import styles from './styles';
import { Button } from '~/components/Button';
import { useTheme } from '~/hooks/useTheme';
import { useAccount } from '~/hooks/useAccount';
import { useAppNavigation } from '~/hooks/useAppNavigation';

const registerSchema = z.object({
	name: z.string().nonempty('Nome é obrigatório'),
	username: z.string().nonempty('Usuário é obrigatório'),
	password: z.string().nonempty('Senha é obrigatório').min(6, 'No mínimo 6 caractéres'),
	confirm_password: z.string().nonempty('Confirmação de senha é obrigatório').min(6, 'No mínimo 6 caractéres'),
}).refine(data => {
	return data.password === data.confirm_password;
}, { 
	message: 'Senhas não são iguais!',
	path: ['confirm_password']
});

type FormValues = z.infer<typeof registerSchema>;
type FormValueName = keyof FormValues;

const { isAndroid } = useTheme();

export default function Register() {
	const { register } = useAccount();
	const appNavigation = useAppNavigation();

	const [errorCreatePassword, setErrorCreatePassword] = useState(false);
	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues: {
			name: '',
			username: '',
			password: '',
			confirm_password: ''
		},
		resolver: zodResolver(registerSchema),
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
			<FlatList 
				showsVerticalScrollIndicator={false}
				style={styles.container}
				data={inputs}
				keyExtractor={input => input.name}
				contentInset={{ bottom: !isAndroid ? 75 : 0 }}
				renderItem={({ item: input }) => (
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
								autoCapitalize="none"
								autoCorrect={false}
							/>
						)}
					/>
				)}
				ListFooterComponent={
					<View style={styles.buttonContainer}>
						<Button 
							text='Cadastrar'
							onPress={handleSubmit(handleRegister)}
						/>
					</View>
				}
			/>
		</Layout>
	);
}