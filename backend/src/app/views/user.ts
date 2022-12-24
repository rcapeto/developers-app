import { ArticleBackend } from './article';
import { CommentBackend } from './comment';

export type UserFrontEnd = UserBackend & {
  avatar_url_mobile: string;
  avatar_url_web: string;
};

export type UserBackend = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar_url: string | null;
  document: string;
  github: string;
  name: string;
  password: string;
  createdAt: Date;
  articles: Partial<ArticleBackend>[];
  comments: Partial<CommentBackend>[];
};
