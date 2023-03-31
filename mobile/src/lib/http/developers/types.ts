import { ApiResponse } from '~/lib/http/types/api-response';
import { Developer, Publication } from '~/lib/http/types/entity';

// [GET - Request] => Developer data
export interface GetDeveloperParams {
   developerId: string;
}

// [GET - Response] => Me data
export type MeResponse = ApiResponse<{ developer: Developer }>;

// [GET - Response] => Developers
export type GetDevelopersResponse = ApiResponse<{
   page: number;
   perPage: number;
   totalPages: number;
   developers: Developer[];
}>;

// [GET - Response] => Publications
export type GetPublications = ApiResponse<{
   page: number;
   perPage: number;
   totalPages: number;
   publications: Publication[];
}>;