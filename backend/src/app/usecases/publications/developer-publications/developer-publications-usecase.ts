import {
  PublicationsRepository,
  AllDeveloperPublicationsParams,
  GetPublicationsResponse,
} from '@application/repositories/publications-repository';

type AllDeveloperPublicationsRequest = {
  developerId: string;
  params?: AllDeveloperPublicationsParams;
};
type AllDeveloperPublicationsResponse = Promise<GetPublicationsResponse>;

export class AllDeveloperPublicationsUsecase {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async execute(
    request: AllDeveloperPublicationsRequest,
  ): AllDeveloperPublicationsResponse {
    const { developerId, params } = request;
    const response = await this.publicationsRepository.allDeveloperPublications(
      developerId,
      params,
    );
    return response;
  }
}
