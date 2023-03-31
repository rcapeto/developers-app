import { DeveloperBackend } from '@application/model/developer';

export interface GetDevelopersParams {
  perPage?: number;
  page?: number;
  search?: string;
}

export interface GetDevelopersResponse {
  perPage: number;
  page: number;
  totalPages: number;
  developers: DeveloperBackend[];
  count: number;
}

export interface UpdateDeveloperParams {
  name: string;
  avatar_url: string;
  techs: string;
  username: string;
  new_password: string;
  old_password: string;
}

export abstract class DevelopersRepository {
  abstract all(params?: GetDevelopersParams): Promise<GetDevelopersResponse>;
  abstract delete(developerId: string): Promise<void>;
  abstract findOne(developerId: string): Promise<DeveloperBackend | null>;
  abstract updateGithub(
    developerId: string,
    github: string,
  ): Promise<DeveloperBackend>;
  abstract update(
    developerId: string,
    params?: Partial<UpdateDeveloperParams>,
  ): Promise<DeveloperBackend>;
}
