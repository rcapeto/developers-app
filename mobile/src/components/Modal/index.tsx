import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import styles from './styles';

export function Modal() {
	const bottomSheetRef = useRef<BottomSheet>(null);

	return(
		<BottomSheet
			ref={bottomSheetRef}
			index={1}
			snapPoints={[200, '50%']}
			handleHeight={300}
			contentHeight={300}
			animateOnMount={true}
			enablePanDownToClose
			handleIndicatorStyle={styles.indicator}
			backgroundStyle={styles.container}
		>
			<View style={styles.content}>
				<Text>Awesome 🎉</Text>
			</View>
		</BottomSheet>
	);
}