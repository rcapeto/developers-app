import {
  PublicationsRepository,
  CreatePublicationParams,
} from '@application/repositories/publications-repository';

type CreatePublicationRequest = CreatePublicationParams;
type CreatePublicationResponse = Promise<void>;

export class CreatePublicationsUsecase {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async execute(request: CreatePublicationRequest): CreatePublicationResponse {
    await this.publicationsRepository.create(request);
  }
}
