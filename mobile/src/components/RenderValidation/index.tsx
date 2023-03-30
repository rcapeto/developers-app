import React, { ReactNode } from 'react';

interface RenderValidationProps {
   validation: boolean;
   validComponent?: ReactNode;
   unvalidComponent?: ReactNode;
}

/**
 *
 * @param props Propriedades do componente
 * @param props.validation Validação que deve ser feita
 * @param props.validComponent Caso a validação seja correta, vai ser renderizado o `children`
 * @param props.unvalidComponent Caso a validação seja incorreta, vai ser renderizado o `Else`
 * @returns JSX.Element
 * @example
 *  const isPositve = true
 *
 *  <ConditionRender
 *    validation={isPositve}
 *    unvalidComponent={<p>Validação incorreta</p>}>
 *    validComponent={<p>Validação correta</p>}
 *  />
 */
export function RenderValidation(props: RenderValidationProps) {
	const { validation, validComponent, unvalidComponent } = props;
	return (
		<>
			{ validation ? validComponent : unvalidComponent }
		</>
	);
}
