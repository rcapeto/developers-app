import { ArticleBackend } from './article';
import { CommentBackend } from './comment';

export type UserFrontEnd = {
  avatar_url_mobile: string;
  avatar_url_web: string;
  avatar_url: string;
  email: string;
  firstName: string;
  lastName: string;
  document: string;
  github: string;
  name: string;
  createdAt: Date;
  articles: Partial<ArticleBackend>[];
  comments: Partial<CommentBackend>[];
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
