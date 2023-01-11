import { AccountReducerState } from '../contexts/account/AccountReducer';

export interface LoginFunctionParams {
   username: string;
   password: string;
}

export interface RegisterFuncionParams {
   name: string;
   confirm_password: string;
   password: string;
   username: string;
}

export interface AccountContextValues extends AccountReducerState {
   isLogged: boolean;
   login(params: LoginFunctionParams): Promise<void>;
   logout(): void;
   register(params: RegisterFuncionParams): Promise<void>;
   me(): Promise<void>;
 }