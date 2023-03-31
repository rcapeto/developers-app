import {
  AccountRepository,
  AccountRepositoryLoginParams,
} from '@application/repositories/account-repository';

type AccountRegisterUsecaseRequest = AccountRepositoryLoginParams;
type AccountRegisterUsecaseResponse = Promise<string>;

export class AccountLoginUsecase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(
    request: AccountRegisterUsecaseRequest,
  ): AccountRegisterUsecaseResponse {
    const token = await this.accountRepository.login(request);
    return token;
  }
}
