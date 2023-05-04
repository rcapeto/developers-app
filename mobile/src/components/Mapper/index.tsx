import React, { ReactNode, Fragment } from 'react';

export type RenderItemParams<Type> =  {
   item: Type;
   index: number;
}

export interface MapperProps<Type> {
   data: Type[];
   keyExtractor: (item: Type) => string;
   renderItem: (params: RenderItemParams<Type>) => ReactNode; 
}

export function Mapper<Type>(props: MapperProps<Type>) {
	return(
		<Fragment>
			{
				props.data.map((item, index) => (
					<Fragment key={props.keyExtractor(item)}>
						{ props.renderItem({ item, index })}
					</Fragment>
				))
			}
		</Fragment>
	);
}