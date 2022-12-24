import {
  FindManyParams,
  FindManyResponse,
  UsersRepository,
} from '@app/repositories/user/UsersRepository';

type RequestUsecase = FindManyParams;
type ResponseUsecase = Promise<FindManyResponse>;

export class FindManyUsersUsecase {
  constructor(private repository: UsersRepository) {}
  async execute(request?: RequestUsecase): ResponseUsecase {
    const response = await this.repository.findMany(request);
    return response;
  }
}
