import { PublicationsRepository } from '@application/repositories/publications-repository';

type DeletePublicationRequest = {
  developerId: string;
  publicationId: string;
};
type DeletePublicationResponse = Promise<void>;

export class DeletePublicationsUsecase {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async execute(request: DeletePublicationRequest): DeletePublicationResponse {
    const { developerId, publicationId } = request;
    await this.publicationsRepository.delete(developerId, publicationId);
  }
}
