import { DevelopersRepository } from '@application/repositories/developers-repository';

type DeleteDeveloperRequest = {
  developerId: string;
};

type DeleteDeveloperResponse = Promise<void>;

export class DeleteDeveloperUsecase {
  constructor(private developersRepository: DevelopersRepository) {}

  async execute(request: DeleteDeveloperRequest): DeleteDeveloperResponse {
    const { developerId } = request;
    await this.developersRepository.delete(developerId);
  }
}
