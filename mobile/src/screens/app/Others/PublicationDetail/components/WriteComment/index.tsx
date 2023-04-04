import React, { useCallback, useState } from 'react';
import { View, TextInput, Text } from 'react-native';

import styles from './styles';
import { Button } from '~/components/Button';
import { useTheme } from '~/hooks/useTheme';

interface WriteCommentProps {
   publicationId: string;
   developerId: string;
}

export function WriteComment(props: WriteCommentProps) {
	const [comment, setComment] = useState('');
	const { colors } = useTheme();

	const handleCreateComment = useCallback(() => {
		const developerId = props.developerId;
		const publicationId = props.publicationId;

		if(developerId && publicationId) {
			console.log('Create comment', {
				developerId,
				publicationId,
				comment,
			});
		}
	}, [props.developerId, props.publicationId]);

	return(
		<View style={styles.container}>
			<Text style={styles.title}>
            Comentar:
			</Text>

			<TextInput 
				style={styles.input}
				keyboardAppearance="dark"
				multiline
				textAlignVertical="top"
				value={comment}
				onChangeText={setComment}
				placeholder="Deixe seu comentário"
				placeholderTextColor={colors.gray[300]}
			/>

			<Button 
				text="Comentar"
				onPress={handleCreateComment}
				style={styles.button}
			/>
		</View>
	);
}