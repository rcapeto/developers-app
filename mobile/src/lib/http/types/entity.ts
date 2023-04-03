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

export interface Publication {
   developer: {
      name: string;
      github: string;
      username: string;
      avatar_url: {
         origin: string;
         mobile: string;
         web: string;
      }
   }
   comments: [];
   createdAt: string;
   description: string;
   id: string;
   likes: [];
   editAt: string | null;
   title: string;
   developerId: string;
   thumbnail: {
      origin: string;
      mobile: string;
      web: string;
   }
}
