import { BasicUser } from '@source/entities/user';
import { UserRepository } from '@source/repositories/UserRespository';

type RequestCreateUserUsecase = BasicUser;

type ResponseCreateUserUsecase = void;

export class CreateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: RequestCreateUserUsecase,
  ): Promise<ResponseCreateUserUsecase> {
    await this.userRepository.create(request);
  }
}
