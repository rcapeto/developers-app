export type ErrorMessageCause = 'validation' | 'server_error' | 'error';

export class ErrorMessage {
  constructor(public message: string, public cause: ErrorMessageCause) {}
}
