export type ApiResponse<Type = object> = {
   data: Partial<ErrorResponse & Type>
}

export interface ErrorResponse {
   error: boolean;
   message: string;
   cause: string;
}

export type HTTPErrorCallback = (errorMessage?: string) => void;