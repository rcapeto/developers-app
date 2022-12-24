import { UsersRepository } from '@app/repositories/user/UsersRepository';
import { UserBackend } from '@app/views/user';

type RequestUsecase = {
  email: string;
};
type ResponseUsecase = Promise<UserBackend | undefined>;

export class AuthenticateLoginUsecase {
  constructor(private repository: UsersRepository) {}

  async execute(request: RequestUsecase): ResponseUsecase {
    const user = await this.repository.findByEmail(request?.email);
    return user;
  }
}
