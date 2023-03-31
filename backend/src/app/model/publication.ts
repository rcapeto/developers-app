import { CommentBackend } from './comment';
import { DeveloperBackend, DeveloperFrontend } from './developer';
import { LikeBackend } from './like';

export interface PublicationBackend {
  id: string;
  createdAt: Date;
  title: string;
  thumbnail: string;
  description: string;
  developerId: string;
  likes: LikeBackend[];
  comments: CommentBackend[];
  developer: DeveloperBackend;
  editAt?: Date;
}

export interface PublicationFrontend
  extends Omit<PublicationBackend, 'thumbnail' | 'developer'> {
  thumbnail: {
    mobile: string;
    web: string;
    origin: string;
  };
  developer: DeveloperFrontend;
}
