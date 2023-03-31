import React, { useMemo } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '~/hooks/useTheme';

import styles from './styles';

const { fontSize, fontFamily } = useTheme();

export interface SectionTitleProps {
   size?: keyof typeof fontSize;
   family?: keyof typeof fontFamily;
   text: string;
   center?: boolean;
}


export function SectionTitle({
	family,
	size,
	text,
	center = true,
}: SectionTitleProps) {
	const textStyle = useMemo(() => {
		const style: StyleProp<TextStyle>[] = [styles.text];

		if(center) {
			style.push(styles.center);
		}

		if(family) {
			style.push({ fontFamily: fontFamily[family] });
		}

		if(size) {
			style.push({ fontSize: fontSize[size] });
		}

		return style;

	}, [family, size, center]);

	return(
		<Text 
			style={textStyle}>
			{text}
		</Text>
	);
}