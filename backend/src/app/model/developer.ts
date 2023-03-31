import { CommentBackend } from './comment';
import { LikeBackend } from './like';
import { PublicationBackend } from './publication';

export interface DeveloperBackend {
  name: string;
  github: string;
  username: string;
  points: number;
  id: string;
  techs: string;
  createdAt: Date;
  publications: PublicationBackend[];
  likes: LikeBackend[];
  password: string;
  avatar_url: string;
  comments: CommentBackend[];
}

export type DeveloperFrontend = Omit<
  DeveloperBackend,
  'avatar_url' | 'password' | 'publications'
> & {
  avatar_url: {
    origin: string;
    web: string;
    mobile: string;
  };
};
