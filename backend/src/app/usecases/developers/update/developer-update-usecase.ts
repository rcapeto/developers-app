import { DeveloperBackend } from '@application/model/developer';
import {
  DevelopersRepository,
  type UpdateDeveloperParams,
} from '@application/repositories/developers-repository';

type UpdateDeveloperRequest = {
  developerId: string;
  params?: Partial<UpdateDeveloperParams>;
};

type UpdateDeveloperResponse = Promise<DeveloperBackend>;

export class UpdateDeveloperUsecase {
  constructor(private developersRepository: DevelopersRepository) {}

  async execute(request: UpdateDeveloperRequest): UpdateDeveloperResponse {
    const { developerId, params } = request;
    const developer = await this.developersRepository.update(
      developerId,
      params,
    );
    return developer;
  }
}
