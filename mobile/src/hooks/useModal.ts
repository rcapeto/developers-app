import { ModalContext } from '../contexts/modal/ModalContext';
import { useContext } from 'react';

export function useModal() {
	return useContext(ModalContext);
}