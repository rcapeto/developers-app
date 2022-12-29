import React from 'react';
import { WithChildren } from '../../types/children';

interface RenderValidationProps extends WithChildren {
   validation: boolean;
}

export function RenderValidation({
	validation,
	children
}: RenderValidationProps) {
	if(!validation) {
		return null;
	}
   
	return <>{children}</>;
}