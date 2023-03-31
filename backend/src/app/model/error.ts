export type ErrorMessageCause =
  | 'validation'
  | 'server_error'
  | 'error'
  | 'unauthorized';

export class ErrorMessage {
  public error: boolean;

  constructor(public message: string, public cause: ErrorMessageCause) {
    this.error = true;
  }
}
