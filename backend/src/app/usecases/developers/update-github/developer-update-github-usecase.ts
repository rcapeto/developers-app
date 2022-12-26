import { DeveloperFrontend } from '@application/model/developer';
import { DevelopersRepository } from '@application/repositories/developers-repository';

type DeveloperUpdateGithubRequest = {
  developerId: string;
  github: string;
};

type DeveloperUpdateGithubResponse = Promise<DeveloperFrontend>;

export class DeveloperUpdateGithubUsecase {
  constructor(private developersRepository: DevelopersRepository) {}

  async execute(
    request: DeveloperUpdateGithubRequest,
  ): DeveloperUpdateGithubResponse {
    const { developerId, github } = request;
    const response = await this.developersRepository.updateGithub(
      developerId,
      github,
    );
    return response;
  }
}
