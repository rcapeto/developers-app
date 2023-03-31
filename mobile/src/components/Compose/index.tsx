import React, { Fragment } from 'react';

interface Props {
   contexts: Array<React.JSXElementConstructor<React.PropsWithChildren<object>>>
   children: React.ReactNode
}

export function Compose(props: Props) {
	const { children, contexts } = props;
   
	return (
		<Fragment>
			{ 
				contexts.reduceRight(
					(acc, Context) => (
						<Context>
							{acc}
						</Context>
					),
					children
				)
			}
		</Fragment>
	);
}