import { ApiResponse } from '~/lib/http/types/api-response';

// [GET - Response] => Register
export type RegisterResponse = ApiResponse | undefined;

// [GET - Response] => Login
export type LoginResponse = ApiResponse<{ token: string }>;

// [GET - Request] => Login 
export interface LoginParams {
   username: string;
   password: string;
} 

// [GET - Request] => Register
export interface RegisterParams {
   name: string;
   confirm_password: string;
   password: string;
   username: string;
}