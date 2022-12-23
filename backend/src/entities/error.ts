export class ErrorMessage {
  constructor(
    public message: string,
    public cause: string,
    public isError: boolean,
  ) {}
}
