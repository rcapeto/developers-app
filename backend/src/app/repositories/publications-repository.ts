import { PublicationFrontend } from '@application/model/publication';

export interface GetPublicationsParams {
  perPage?: number;
  page?: number;
  search?: string;
}

export interface GetPublicationsResponse {
  perPage: number;
  page: number;
  totalPages: number;
  publications: PublicationFrontend[];
  count: number;
}

export interface AllDeveloperPublicationsParams {
  page?: number;
  perPage?: number;
}

export abstract class PublicationsRepository {
  abstract all(
    params?: GetPublicationsParams,
  ): Promise<GetPublicationsResponse>;
  abstract allDeveloperPublications(
    developerId: string,
    params?: AllDeveloperPublicationsParams,
  ): Promise<GetPublicationsResponse>;
}
