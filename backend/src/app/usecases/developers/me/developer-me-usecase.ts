import { DeveloperBackend } from '@application/model/developer';
import { DevelopersRepository } from '@application/repositories/developers-repository';

type MeDeveloperRequest = {
  developerId: string;
};

type MeDeveloperResponse = Promise<DeveloperBackend | null>;

export class MeDeveloperUsecase {
  constructor(private developersRepository: DevelopersRepository) {}

  async execute(request: MeDeveloperRequest): MeDeveloperResponse {
    const developer = await this.developersRepository.findOne(
      request.developerId,
    );
    return developer;
  }
}
