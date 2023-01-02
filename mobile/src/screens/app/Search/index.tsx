import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import { DevelopersList } from './components/DevelopersList';
import { Layout } from '../../../components/Layout';
import { useTheme } from '../../../hooks/useTheme';
import styles from './styles';
import { RenderValidation } from '../../../components/RenderValidation';

const { colors } = useTheme();

const buttons = [
	{
		text: 'Desenvolvedores',
	},
	{
		text: 'Publicações',
	}
];

export default function Search() {
	const [activeButton, setActiveButton] = useState(0);
	const [search, setSearch] = useState('');

	function changeActiveButton(index: number) {
		return function() {
			setActiveButton(index);
		};
	}

	return(
		<Layout activeHeader headerProps={{ title: 'Explorar'}}>
			<View style={styles.searchContainer}>
				<View style={styles.inputContainer}>
					<TextInput 
						style={styles.input}
						placeholder="Digite aqui o que procura..."
						placeholderTextColor={colors.gray[200]}
						autoCapitalize="none"
						autoCorrect={false}
						autoComplete="off"
						value={search}
						onChangeText={setSearch}
					/>
				</View>
				<View style={styles.buttons}>
					{
						buttons.map((button, index) => (
							<TouchableOpacity 
								style={[
									styles.button,
									index === activeButton ? styles.activeButton : undefined
								]} 
								onPress={changeActiveButton(index)}
								key={button.text}
							>
								<Text style={styles.buttonText}>
									{ button.text }
								</Text>
							</TouchableOpacity>
						))
					}
				</View>
			</View>

			<RenderValidation validation={activeButton === 0}>
				<DevelopersList
					search={search}
				/>
			</RenderValidation>
		</Layout>
	);
}