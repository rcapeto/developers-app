import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { ServerError } from '~/components/Error/ServerError';
import { Loading } from '~/components/Loading';
import { RenderValidation } from '~/components/RenderValidation';
import { useAccount } from '~/hooks/useAccount';
import { useAppNavigation  } from '~/hooks/useAppNavigation';
import { useTheme } from '~/hooks/useTheme';
import { Publication } from '~/lib/http/types/entity';

import { ListHeader } from '~/screens/app/Search/components/ListHeader';
import { usePublicatonsList } from './hooks/usePublicatonsList';
import { PublicationItem } from './components/PublicationItem';
import { first } from '~/utils/first';
import styles from '~/screens/app/Search/styles';

interface ListProps {
   search: string;
}

const { colors } = useTheme();

export function PublicationsList({ search }: ListProps) {
	const [refreshing, setRefreshing] = useState(false);
	const [data, setData] = useState<Publication[]>([]);
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
	} = usePublicatonsList({
		onError: handleError,
		search,
		logout,
	});

	function handleError(message?: string) {
		appNavigation.openDialogBottom({
			Component: ServerError,
			passProps: {
				onCloseModal: appNavigation.closeDialogBottom,
				message: message,
			}
		});
	}

	function renderItem(params: { item: Publication }) {
		const { item: publication } = params;
		return <PublicationItem publication={publication} />;
	}

	async function onRefresh() {
		setRefreshing(true);
		setData([]);

		try {
			const { data: response } = await refetch();
			const results = response?.pages ?? [];
			const publications = results.map(
				result => result?.publications ?? []
			);
			const count = first(results)?.count ?? 0;

			setCount(+count);
			setData(publications.flat());
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
		const developers = results.map(result => result?.publications ?? []);
		const count = first(results)?.count ?? 0;

		setCount(+count);
		setData(developers.flat());
	}, [queryResponse?.pages]);

	return(
		<View style={styles.componentContainer}>
			<ListHeader count={count} title="Publicações"/>

			<FlatList 
				data={data}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				contentContainerStyle={styles.componentList}
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
						validComponent={<Loading style={styles.componentLoading}/>}
					/>
				}
			/>
		</View>
	);
}  