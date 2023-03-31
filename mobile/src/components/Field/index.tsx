import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { Mapper } from '../Mapper';
import { RenderValidation } from '../RenderValidation';

import styles from './styles';

export interface FieldProps {
   name: string;
   value: string;
}

export function Field(props: FieldProps) {
	const hasComma = useMemo(() => props.value.includes(','), [props.value]);

	function renderValidComponent() {
		return(
			<Mapper 
				data={props.value.split(',')}
				keyExtractor={item => item}
				renderItem={({ item: tech }) => (
					<View style={styles.tech}>
						<Text style={styles.techText}>
							{ tech.trim() }
						</Text>
					</View>
				)}
			/>
		);
	}

	return(
		<View style={styles.container}>
			<Text style={styles.labelTitle}>
				{props.name}
			</Text>

			<View style={styles.input}>
				<RenderValidation 
					validation={hasComma}
					validComponent={renderValidComponent()}
					unvalidComponent={
						<Text style={styles.inputText}>
							{props.value}
						</Text>
					}
				/>
			</View>
		</View>
	);
}