import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { ServerError } from '../../../../../components/Error/ServerError';
import { Loading } from '../../../../../components/Loading';
import { useAccount } from '../../../../../hooks/useAccount';
import { useModal } from '../../../../../hooks/useModal';
import { Developer } from '../../../../../types/entitys';
import { DeveloperItem } from './components/Developer';
import { useDevelopersList } from './hook/useDevelopersList';

interface ListProps {
   search: string;
}

export function DevelopersList({ search }: ListProps) {
	const [page, setPage] = useState(1);
	const [refreshing, setRefreshing] = useState(false);

	const { logout } = useAccount();
	const { openModal } = useModal();

	const { isLoading, data: queryResponse, isFetching } = useDevelopersList({
		logout,
		onError: handleError,
		search,
		page,
	});

	console.log(queryResponse?.response.data);

	function handleError() {
		openModal({
			component: <ServerError />
		});
	}

	if(isLoading || isFetching) {
		return (
			<Loading style={styles.mt20}/>
		);
	}

	function renderItem(params: { item: Developer }) {
		const { item: developer } = params;

		return(
			<DeveloperItem developer={developer}/>
		);
	}

	function onRefresh() {
		setRefreshing(true);
		setPage(1);
		setRefreshing(false);
	}

	return(
		<FlatList 
			data={queryResponse?.response?.data?.developers ?? []}
			renderItem={renderItem}
			keyExtractor={item => item.id}
			style={[styles.mt20, styles.flexOne]}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					tintColor="black"
				/>
			}
			showsVerticalScrollIndicator
		/>
	);
}  

const styles = StyleSheet.create({
	mt20: {
		marginTop: 20,
	},
	flexOne: {
		flex: 1,
	}
});