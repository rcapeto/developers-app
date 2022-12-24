import { CommentBackend } from './comment';
import { UserFrontEnd } from './user';

export type ArticleBackend = {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  author: Partial<UserFrontEnd>;
  authorId: string;
  imageUrl?: string;
  comments: Partial<CommentBackend>[];
  likes: number;
};
