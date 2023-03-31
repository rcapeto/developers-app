import {
  PublicationsRepository,
  GetPublicationsParams,
  GetPublicationsResponse,
} from '@application/repositories/publications-repository';

type AllPublicationsRequest = GetPublicationsParams;
type AllPublicationsResponse = Promise<GetPublicationsResponse>;

export class AllPublicationsUsecase {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async execute(request?: AllPublicationsRequest): AllPublicationsResponse {
    const response = await this.publicationsRepository.all(request);
    return response;
  }
}
