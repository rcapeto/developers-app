export type ErrorType = 'server' | 'validation' | 'error';

export class ErrorMessage {
  constructor(
    public message: string,
    public cause: ErrorType,
    public isError?: boolean,
  ) {
    this.isError = true;
  }
}
