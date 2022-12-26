import { DeveloperBackend } from '@application/model/developer';
import { DevelopersRepository } from '@application/repositories/developers-repository';

type FindOneDeveloperRequest = {
  developerId: string;
};

type FindOneDeveloperResponse = Promise<DeveloperBackend | null>;

export class FindOneDeveloperUsecase {
  constructor(private developersRepository: DevelopersRepository) {}

  async execute(request: FindOneDeveloperRequest): FindOneDeveloperResponse {
    const developer = await this.developersRepository.findOne(
      request.developerId,
    );
    return developer;
  }
}
