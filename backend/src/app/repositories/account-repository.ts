export interface AccountRepositoryCreateParams {
  name: string;
  confirm_password: string;
  password: string;
  username: string;
}

export abstract class AccountRepository {
  abstract register(params: AccountRepositoryCreateParams): Promise<void>;
}
