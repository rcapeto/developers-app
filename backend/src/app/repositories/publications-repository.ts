import { PublicationBackend } from '@application/model/publication';

export interface GetPublicationsParams {
  perPage?: number;
  page?: number;
  search?: string;
}

export interface GetPublicationsResponse {
  perPage: number;
  page: number;
  totalPages: number;
  publications: PublicationBackend[];
  count: number;
}

export interface AllDeveloperPublicationsParams {
  page?: number;
  perPage?: number;
}

export interface CreatePublicationParams {
  title: string;
  description: string;
  developerId: string;
  thumbnail?: string;
}

export type UpdatePublicationParams = CreatePublicationParams & {
  publicationId: string;
};

export abstract class PublicationsRepository {
  abstract all(
    params?: GetPublicationsParams,
  ): Promise<GetPublicationsResponse>;
  abstract allDeveloperPublications(
    developerId: string,
    params?: AllDeveloperPublicationsParams,
  ): Promise<GetPublicationsResponse>;
  abstract create(params: CreatePublicationParams): Promise<void>;
  abstract delete(developerId: string, publicationId: string): Promise<void>;
  abstract update(params: UpdatePublicationParams): Promise<PublicationBackend>;
  abstract findOne(publicationId: string): Promise<PublicationBackend>;
}
