import { PublicationBackend } from '@application/model/publication';
import { PublicationsRepository } from '@application/repositories/publications-repository';

type FindOnePublicationRequest = {
  publicationId: string;
};
type FindOnePublicationResponse = Promise<PublicationBackend>;

export class FindOnePublicationsUsecase {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async execute(
    request: FindOnePublicationRequest,
  ): FindOnePublicationResponse {
    const publication = await this.publicationsRepository.findOne(
      request.publicationId,
    );
    return publication;
  }
}
