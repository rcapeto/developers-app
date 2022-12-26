import {
  DevelopersRepository,
  type GetDevelopersParams,
  type GetDevelopersResponse,
} from '@application/repositories/developers-repository';

type AllDevelopersRequest = GetDevelopersParams;
type AllDevelopersResponse = Promise<GetDevelopersResponse>;

export class AllDevelopersUsecase {
  constructor(private developersRepository: DevelopersRepository) {}

  async execute(request?: AllDevelopersRequest): AllDevelopersResponse {
    const response = await this.developersRepository.all(request);
    return response;
  }
}
