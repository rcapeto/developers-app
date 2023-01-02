import { Developer, Publication } from './entitys';

export interface ILoginResponse {
   data: {
      token: string;
      error: boolean;
      message: string;
      cause: string;
   }
}

export interface ICheckDeveloperResponse {
   data: {
      error: boolean;
      message: string;
      cause: string;
      developer: {
         avatar_url: {
            mobile: string;
            web: string;
            origin: string;
         };
         createdAt: string;
         github: string;
         id: string;
         name: string;
         points: number;
         techs: string;
         username: string;
      }
   },
}

export interface IAppDataResponseDevelopers {
   data: {
      page: number;
      perPage: number;
      totalPages: number;
      developers: Developer[];
   }
}

export interface IAppDataResponsePublications {
   data: {
      page: number;
      perPage: number;
      totalPages: number;
      publications: Publication[];
   }
}