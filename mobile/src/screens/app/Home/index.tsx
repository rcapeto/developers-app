import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Layout } from '~/components/Layout';
import { useAccount } from '~/hooks/useAccount';
import { Mapper, RenderItemParams } from '~/components/Mapper';
import { shortcuts, HomeShortcut } from './utils/shortcuts';
import styles from './styles';

export default function Home() {
	const { developer } = useAccount();
	const navigation = useNavigation();

	function handlePressItem(item: HomeShortcut) {
		return () => {
			const screen = item.screen;
			navigation.navigate(screen);
		};
	}

	function renderItem({ item }: RenderItemParams<HomeShortcut>) {
		const Icon = item.icon;

		return(
			<TouchableOpacity style={styles.shortcutContainer} onPress={handlePressItem(item)}>
				<Icon />
				<Text 
					style={styles.shortcutText} 
					ellipsizeMode="tail" 
					numberOfLines={2}
				>
					{item.text}
				</Text>
			</TouchableOpacity>
		);
	}

	return(
		<Layout activeHeader headerProps={{ title: 'Início' }}>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>
						Olá,
					</Text>
					<Text style={[styles.title,styles.titlePurple]}>{developer?.name}</Text>
				</View>

				<View style={styles.shortcutsTitleContainer}>
					<Text style={styles.shortcutsTitle}>Atalhos:</Text>
				</View>

				<View style={styles.shortcutsContainer}>
					
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<Mapper 
							data={shortcuts}
							keyExtractor={item => item.text}
							renderItem={renderItem}
						/>
					</ScrollView>
				</View>
			</ScrollView>
		</Layout>
	);
}