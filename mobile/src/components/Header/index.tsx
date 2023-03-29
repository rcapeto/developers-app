import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { useTheme } from '~/hooks/useTheme';


export interface HeaderProps {
   showBack?: boolean;
   title?: string;
}

function HeaderBoxEmpty() {
	return <View style={styles.empty}/>;
}

const { colors } = useTheme();

export function Header({ 
	title = 'Header Title',
	showBack = false,
}: HeaderProps) {
	const navigation = useNavigation();

	return(
		<View style={styles.headerContainer}>
			{
				showBack ? (
					<TouchableOpacity onPress={navigation.goBack}>
						<AntDesign 
							name="arrowleft"
							color={colors.white}
							size={20}
						/>
					</TouchableOpacity>
				) : <HeaderBoxEmpty />
			}

			<Text style={styles.title}>{title}</Text>

			<HeaderBoxEmpty />
		</View>
	);
}