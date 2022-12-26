import { DeveloperFrontend } from './developer';
import { PublicationFrontend } from './publication';

export interface CommentBackend {
  id: string;
  createdAt: Date;
  editAt?: Date;
  text: string;
  developerId: string;
  publicationId: string;
  developer: DeveloperFrontend;
  publication: PublicationFrontend;
}
