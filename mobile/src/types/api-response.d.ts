export interface ErrorResponse {
   data: {
      error: boolean;
      message: string;
      cause: string;
   }
}

export interface ILoginResponse {
   data: {
      token: string;
   }
}