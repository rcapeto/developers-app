import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '~/hooks/useTheme';

export interface HomeShortcut {
  icon: () => JSX.Element;
  text: string;
  screen: keyof ReactNavigation.RootParamList;
}

const { colors, fontSize } = useTheme();

export const shortcuts: HomeShortcut[] = [
	{
		text: 'Crie uma nova publicação',
		icon: () => <Feather name="plus" color={colors.purple[300]} size={fontSize.xl}/>,
		screen: 'newPublication'
	}
];