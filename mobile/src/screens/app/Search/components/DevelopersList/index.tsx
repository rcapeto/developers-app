import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { ServerError } from '../../../../../components/Error/ServerError';
import { Loading } from '../../../../../components/Loading';
import { useAccount } from '../../../../../hooks/useAccount';
import { useModal } from '../../../../../hooks/useModal';
import { useTheme } from '../../../../../hooks/useTheme';
import { Developer } from '../../../../../types/entitys';
import { DeveloperItem } from './components/Developer';
import { useDevelopersList } from './hook/useDevelopersList';

interface ListProps {
   search: string;
}

const { colors } = useTheme();

export function DevelopersList({ search }: ListProps) {
	const [page, setPage] = useState(1);
	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState<Developer[]>([]);

	const { logout } = useAccount();
	const { openModal, closeModal } = useModal();

	const { isLoading, data: queryResponse, isFetching } = useDevelopersList({
		logout,
		onError: handleError,
		search,
		page,
	});

	const totalPages = useMemo<number>(() => {
		return queryResponse?.response.data.totalPages ?? 1;
	}, [queryResponse]);

	function handleError() {
		openModal({
			component: ServerError,
			passProps: {
				onCloseModal: closeModal
			}
		});
	}

	function renderItem(params: { item: Developer }) {
		const { item: developer } = params;

		return(
			<DeveloperItem developer={developer}/>
		);
	}

	function onRefresh() {
		setRefreshing(true);
		setData([]);
		setPage(1);
		setRefreshing(false);
	}

	function handleEndReached() {
		const pageState = page + 1;

		if(pageState <= totalPages) {
			setPage(state => state + 1);
		}
	}

	useEffect(() => {
		if(queryResponse?.response.data.developers) {
			const developers = queryResponse.response.data.developers ?? [];
			console.log('developers', developers.length);
			setData(state => [...state, ...developers]);
		}
	}, [queryResponse]);

	return(
		<FlatList 
			data={data}
			renderItem={renderItem}
			keyExtractor={item => item.id}
			style={[styles.mt20, styles.flexOne]}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
					tintColor={colors.purple[300]}
				/>
			}
			onEndReachedThreshold={0.2}
			onEndReached={handleEndReached}
			showsVerticalScrollIndicator={false}
			ListFooterComponent={() => (
				<>
					{
						isLoading || isFetching && (
							<Loading style={styles.mt20}/>)
					}
				</>
			)}
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