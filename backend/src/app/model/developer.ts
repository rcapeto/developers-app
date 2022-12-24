import { LikeBackend } from './like';
import { PublicationBackend } from './publication';

export interface DeveloperBackend {
  name: string;
  github: string;
  username: string;
  password: string;
  points: number;
  id: string;
  avatar_url: string;
  techs: string;
  createdAt: Date;
  publications: PublicationBackend[];
  likes: LikeBackend[];
}

export interface DeveloperFrontend
  extends Omit<DeveloperBackend, 'avatar_url'> {
  avatar_url: {
    mobile: string;
    web: string;
    origin: string;
  };
}
