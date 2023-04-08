import React, { Fragment, useMemo, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Layout } from '~/components/Layout';
import { Input, InputProps } from '~/components/Input';
import styles from './styles';
import { Button } from '~/components/Button';
import { http } from '~/lib/http';
import { useAccount } from '~/hooks/useAccount';
import { useAppNavigation } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';
import { ImagePicker } from './components/ImagePicker';

const createPublicationSchema = z.object({
	title: z.string().nonempty('Adicione um título para sua incrível publicação'),
	description: z.string().nonempty('Adicione uma descrição para sua incrível publicação'),
});

type FormValues = z.infer<typeof createPublicationSchema>;
type FormValueName = keyof FormValues;

export default function NewPublication() {
	const [thumbnail, setThumbnail] = useState('');

	const { control, handleSubmit, formState: { errors }, resetField } = useForm({
		defaultValues: {
			title: '',
			description: '',
		},
		resolver: zodResolver(createPublicationSchema),
	});

	const { logout } = useAccount();
	const appNavigation = useAppNavigation();
	const { colors } = useTheme();
	const navigation = useNavigation();

	const inputs = useMemo<InputProps[]>(() => {
		return [
			{
				name: 'title',
				label: 'Título',
			},
			{
				name: 'description',
				label: 'Descrição',
				multiline: true,
				boxStyle: {
					height: 150,
				},
				style: {
					height: '100%'
				},
				textAlignVertical: 'top'
			}
		];
	}, []);

	function handleShowError() {
		appNavigation.openDialogBottom({
			buttonText: 'Ok!',
			description: 'Ops! Erro ao criar uma publicação!',
			isError: true,
			title: 'Erro!',
			showButton: true,
			icon: (
				<Feather 
					name="alert-circle"
					color={colors.red[500]}
					size={40}
				/>
			),
		});
	}

	function handleShowSuccess() {
		appNavigation.openDialogBottom({
			title: 'Publicação criada com sucesso!',
			showButton: true,
			isSuccess: true,
			buttonText: 'Ok!',
			icon: <AntDesign name="checkcircle" color={colors.green[500]} size={40} />,
			onCloseCallback: () => {
				resetField('description');
				resetField('title');
				setThumbnail('');
				navigation.goBack();
			},
		});
	}

	async function handleCreatePublication(values: FormValues) {
		const params = {
			...values,
			thumbnail,
		};
		
		const { response } = await http.publications().create(params, handleShowError, logout);

		if(!response) {
			handleShowSuccess();
		}
	}

	return(
		<Layout activeHeader headerProps={{ title: 'Nova publicação' }}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>
					Criar nova Publicação
				</Text>

				<FlatList 
					style={styles.form}
					showsVerticalScrollIndicator={false}
					data={inputs}
					keyExtractor={input => input.name}
					contentContainerStyle={styles.formContent}
					renderItem={({ item: input }) => (
						<Controller 
							control={control}
							name={input.name as FormValueName}
							rules={{ required: true }}
							render={({ field: { onChange, value, onBlur } }) => (
								<Input 
									{...input}
									errorMessage={errors[input.name]?.message}
									onChangeText={onChange}
									value={value}
									onBlur={onBlur}
									autoCapitalize="none"
									autoCorrect={false}
								/>
							)}
						/>
					)}
					ListFooterComponent={
						<Fragment>
							<ImagePicker 
								currentImage={thumbnail} 
								onChangeImage={setThumbnail}
							/>
							<Button 
								text="Criar publicação"
								onPress={handleSubmit(handleCreatePublication)}
								style={styles.button}
							/>
						</Fragment>
					}
				/>

				<View style={styles.form}>

				</View>
			</View>
		</Layout>
	);
}