import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { useTheme } from '~/hooks/useTheme';
import { RenderValidation } from '../RenderValidation';


export interface HeaderProps {
   showBack?: boolean;
   title?: string;
	showCloseButton?: boolean;
}

function HeaderBoxEmpty() {
	return <View style={styles.empty}/>;
}

const { colors } = useTheme();

export function Header({ 
	title = 'Header Title',
	showBack = false,
	showCloseButton = false,
}: HeaderProps) {
	const navigation = useNavigation();

	return(
		<View style={styles.headerContainer}>
			<RenderValidation 
				validation={showBack}
				validComponent={
					<TouchableOpacity onPress={navigation.goBack}>
						<AntDesign 
							name="arrowleft"
							color={colors.white}
							size={20}
						/>
					</TouchableOpacity>
				}
			/>
			
			<RenderValidation 
				validation={showCloseButton}
				validComponent={
					<TouchableOpacity onPress={navigation.goBack}>
						<AntDesign 
							name="close"
							color={colors.white}
							size={20}
						/>
					</TouchableOpacity>
				}
			/>

			<RenderValidation 
				validation={!showBack && !showCloseButton}
				validComponent={<HeaderBoxEmpty />}
			/>

			<Text style={styles.title}>{title}</Text>

			<HeaderBoxEmpty />
		</View>
	);
}