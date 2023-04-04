import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Input, InputProps } from '~/components/Input';
import { Layout } from '~/components/Layout';
import { SectionTitle } from '~/components/SectionTitle';
import { useTheme } from '~/hooks/useTheme';
import { Button } from '~/components/Button';

import styles from './styles';
import { useAccount } from '~/hooks/useAccount';

interface FormValues {
	username: string;
	password: string;
}

type FormValueName = keyof FormValues;

const { colors, fontSize } = useTheme();

const loginSchema = yup.object().shape({
	username: yup.string().required('Usuário é obrigatório'),
	password: yup.string().required('Senha é obrigatório').min(6, 'No mínimo 6 caractéres'),
});

export default function Login() {
	const navigation = useNavigation();
	const { login, isLoading } = useAccount();

	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			username: '',
			password: ''
		},
		resolver: yupResolver(loginSchema),
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