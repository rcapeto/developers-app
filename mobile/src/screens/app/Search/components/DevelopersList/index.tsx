import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { ServerError } from '~/components/Error/ServerError';
import { Loading } from '~/components/Loading';
import { RenderValidation } from '~/components/RenderValidation';
import { useAccount } from '~/hooks/useAccount';
import { useAppNavigation  } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';
import { Developer } from '~/lib/http/types/entity';

import { DeveloperItem } from './components/Developer';
import { useDevelopersList } from './hook/useDevelopersList';
import { ListHeader } from './components/ListHeader';
import { first } from '~/utils/first';
import styles from './styles';

interface ListProps {
   search: string;
}

const { colors } = useTheme();

export function DevelopersList({ search }: ListProps) {
	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState<Developer[]>([]);
	const [count, setCount] = useState(0);

	const { logout } = useAccount();
	const appNavigation = useAppNavigation();

	const { 
		isLoading, 
		isFetching, 
		fetchNextPage, 
		refetch,
		isError,
		data: queryResponse 
	} = useDevelopersList({
		onError: handleError,
		search,
		logout,
	});

	function handleError() {
		appNavigation.openDialogBottom({
			Component: ServerError,
			passProps: {
				onCloseModal: appNavigation.closeDialogBottom,
			}
		});
	}

	function renderItem(params: { item: Developer }) {
		const { item: developer } = params;
		return <DeveloperItem developer={developer}/>;
	}

	async function onRefresh() {
		setRefreshing(true);
		setData([]);

		try {
			const { data: response } = await refetch();
			const results = response?.pages ?? [];
			const developers = results.map(
				result => result?.developers ?? []
			);
			const count = first(results)?.count ?? 0;

			setCount(+count);
			setData(developers.flat());
		} catch(err) {
			handleError();
		} finally {
			setRefreshing(false);
		}
	}

	function handleEndReached() {
		fetchNextPage();
	}

	useEffect(() => {
		const results = queryResponse?.pages ?? [];
		const developers = results.map(result => result?.developers ?? []);
		const count = first(results)?.count ?? 0;

		setCount(+count);
		setData(developers.flat());
	}, [queryResponse?.pages]);

	return(
		<View style={styles.container}>
			<ListHeader count={count}/>
			<FlatList 
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				contentContainerStyle={styles.list}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={colors.purple[300]}
					/>
				}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.2}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={
					<RenderValidation 
						validation={(isLoading || isFetching) && !isError} 
						validComponent={<Loading style={styles.loading}/>}
					/>
				}
			/>
		</View>
	);
}  