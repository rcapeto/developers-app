import {
  AccountRepository,
  AccountRepositoryCreateParams,
} from '@application/repositories/account-repository';

type AccountRegisterUsecaseRequest = AccountRepositoryCreateParams;
type AccountRegisterUsecaseResponse = Promise<void>;

export class AccountRegisterUsecase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(
    request: AccountRegisterUsecaseRequest,
  ): AccountRegisterUsecaseResponse {
    await this.accountRepository.register(request);
  }
}
