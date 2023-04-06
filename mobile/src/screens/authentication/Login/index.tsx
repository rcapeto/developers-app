import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Controller, useForm,  } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Input, InputProps } from '~/components/Input';
import { Layout } from '~/components/Layout';
import { SectionTitle } from '~/components/SectionTitle';
import { useTheme } from '~/hooks/useTheme';
import { Button } from '~/components/Button';

import styles from './styles';
import { useAccount } from '~/hooks/useAccount';

const loginSchema = z.object({
	username: z.string().nonempty('Usuário é obrigatório'),
	password: z.string().nonempty('Senha é obrigatória').min(6, 'Digite 6 caractéres no mínimo')
});

type FormValues = z.infer<typeof loginSchema>;
type FormValueName = keyof FormValues;

const { colors, fontSize } = useTheme();


export default function Login() {
	const navigation = useNavigation();
	const { login, isLoading } = useAccount();

	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			username: '',
			password: ''
		},
		resolver: zodResolver(loginSchema),
	});

	async function handleLogin(values: FormValues) {
		await login(values);
	}

	const inputs = useMemo<InputProps[]>(() => {
		return [
			{
				name: 'username',
				label: 'Usuário',
				leftIcon: (
					<FontAwesome 
						name="user" 
						color={colors.gray[300]}
						size={fontSize.lg}
					/>
				),
			},
			{
				name: 'password',
				isPassword: true,
				label: 'Senha',
			}
		];
	}, []);

	function handleGoToRegister() {
		navigation.navigate('register');
	}

	return(
		<Layout>
			<SectionTitle text="Entrar"/>

			<View style={styles.form}>
				<FlatList 
					data={inputs}
					keyExtractor={input => input.name}
					renderItem={({ item: input }) => (
						<Controller
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
					scrollEnabled={false}
				/>

				<View style={styles.buttonContainer}>
					<Button 
						text='Entrar' 
						onPress={handleSubmit(handleLogin)}
						isLoading={isLoading}
						disabled={isLoading}
					/>
					<Button 
						text="Não possui conta? Cadastre-se"
						type="outlined"
						onPress={handleGoToRegister}
					/>
				</View>
			</View>
		</Layout>
	);
}