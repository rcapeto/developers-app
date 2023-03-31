import React, { useMemo, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

import { DevelopersList } from './components/DevelopersList';
import { PublicationsList } from './components/PublicationsList';
import { Layout } from '~/components/Layout';
import { useTheme } from '~/hooks/useTheme';
import styles from './styles';
import { Mapper } from '~/components/Mapper';

const { colors } = useTheme();

const buttons = ['Desenvolvedores', 'Publicações'];

export default function Search() {
	const [activeButton, setActiveButton] = useState(0);
	const [search, setSearch] = useState('');

	function changeActiveButton(index: number) {
		return function() {
			setActiveButton(index);
		};
	}

	const Component = useMemo(() => {
		return activeButton === 0 ? DevelopersList : PublicationsList;
	}, [activeButton]);

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
						keyboardAppearance="dark"
					/>
				</View>
				<View style={styles.buttons}>
					<Mapper 
						data={buttons}
						keyExtractor={button => button}
						renderItem={({ item: button, index }) => (
							<TouchableOpacity 
								style={[
									styles.button,
									index === activeButton ? styles.activeButton : undefined
								]} 
								onPress={changeActiveButton(index)}
							>
								<Text style={styles.buttonText}>
									{ button }
								</Text>
							</TouchableOpacity>
						)}
					/>
				</View>
			</View>

			<Component search={search} />
		</Layout>
	);
}