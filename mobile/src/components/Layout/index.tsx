import React, { useMemo, Fragment } from 'react';
import { 
	StyleProp, 
	View, 
	ViewStyle, 
	Keyboard, 
	TouchableWithoutFeedback, 
	KeyboardAvoidingView 
} from 'react-native';
import { useTheme } from '~/hooks/useTheme';
import { WithChildren } from '~/types/children';
import { type HeaderProps, Header } from '../Header';
import { RenderValidation } from '../RenderValidation';

import styles from './styles';

const { isAndroid } = useTheme();

export interface LayoutProps extends WithChildren {
   activeHeader?: boolean;
   headerProps?: HeaderProps;
}

export function Layout({ 
	children,
	activeHeader = false,
	headerProps= {}
}: LayoutProps) {

	const containerStyles = useMemo(() => {
		const style: StyleProp<ViewStyle>[] = [styles.container];

		if(!activeHeader){
			style.push(styles.withNotHeader);
		}

		return style;

	}, [activeHeader]);

	return(
		<KeyboardAvoidingView
			behavior={isAndroid ? 'height' : 'padding'}
			style={styles.flexOne}
		>
			<View style={containerStyles}>
				<RenderValidation 
					validation={activeHeader} 
					validComponent={<Header {...headerProps}/>}
				/>

				<View style={styles.content}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<Fragment>
							{children}
						</Fragment>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}