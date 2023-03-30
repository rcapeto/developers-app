import { AccountReducerState } from '~/contexts/account/AccountReducer';
import { LoginParams, RegisterParams } from '~/lib/http/account/types';

export interface AccountContextValues extends AccountReducerState {
   isLogged: boolean;
   login(params: LoginParams): Promise<void>;
   logout(): void;
   register(params: RegisterParams): Promise<void>;
   me(): Promise<void>;
}