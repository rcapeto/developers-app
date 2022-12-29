import { AccountReducerState } from '../contexts/account/AccountReducer';

interface LoginFunctionParams {
   username: string;
   password: string;
}

export interface AccountContextValues extends AccountReducerState {
   isLogged: boolean;
   login(params: LoginFunctionParams): Promise<void>;
}