import { LikeBackend } from './like';

export interface PublicationBackend {
  id: string;
  createdAt: Date;
  title: string;
  thumbnail: string;
  description: string;
  developerId: string;
  likes: LikeBackend[];
}

export interface PublicationFrontend
  extends Omit<PublicationBackend, 'thumbnail'> {
  thumbnail: {
    mobile: string;
    web: string;
    origin: string;
  };
}
