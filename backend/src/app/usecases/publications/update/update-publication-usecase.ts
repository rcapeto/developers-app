import { PublicationBackend } from '@application/model/publication';
import {
  PublicationsRepository,
  UpdatePublicationParams,
} from '@application/repositories/publications-repository';

type UpdatePublicationRequest = UpdatePublicationParams;
type UpdatePublicationResponse = Promise<PublicationBackend>;

export class UpdatePublicationsUsecase {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async execute(request: UpdatePublicationRequest): UpdatePublicationResponse {
    const publication = await this.publicationsRepository.update(request);
    return publication;
  }
}
