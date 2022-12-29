export interface Developer {
   name: string;
   github: string;
   username: string;
   id: string;
   points: number;
   avatar_url: {
      web: string;
      mobile: string;
      origin: string;
   },
   createdAt: string;
   techs: string;
}