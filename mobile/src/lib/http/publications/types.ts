import { ApiResponse } from '~/lib/http/types/api-response';
import { Publication } from '~/lib/http/types/entity';

// [GET - Request] => Publications data
export interface GetPublicationsParams {
   page?: number;
   perPage?: number;
   search?: string;
}

// [GET - Response] => Publications data
export type GetPublicationsResponse = ApiResponse<{
   page: number;
   perPage: number;
   totalPages: number;
   publications: Publication[];
}>

// [GET - Request] => Publication data
export interface GetPublicationParams {
   publicationId: string;
}

// [GET - Response] => Publication data
export type GetPublicationResponse = ApiResponse<{
   publication: Publication;
}>;