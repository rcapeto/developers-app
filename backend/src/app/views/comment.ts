import { ArticleBackend } from './article';
import { UserFrontEnd } from './user';

export type CommentBackend = {
  id: string;
  text: string;
  createdAt: Date;
  author: Partial<UserFrontEnd>;
  authorId: string;
  article: Partial<ArticleBackend>;
  likes: number;
  articleId: string;
};
