import { UsersRepository } from '@app/repositories/user/UsersRepository';
import { UserBackend } from '@app/views/user';

type RequestUsecase = Partial<UserBackend>;
type ResponseUsecase = Promise<void>;

export class CreateUserUsecase {
  constructor(private repository: UsersRepository) {}
  async execute(request: RequestUsecase): ResponseUsecase {
    try {
      await this.repository.create(request);
    } catch (err) {
      throw err;
    }
  }
}
