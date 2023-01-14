import { AppNavigationState } from './context';

export declare global {
   namespace ReactNavigation {
      interface RootParamList {
         login: undefined;
         register: undefined;
         bottomTabs: undefined;
         search: undefined;
         home: undefined;
         profile: undefined;
         newPublication: undefined;
         developerDetail: {
            id: string;
         }
         appNavigation: AppNavigationState;
      }
   }
}