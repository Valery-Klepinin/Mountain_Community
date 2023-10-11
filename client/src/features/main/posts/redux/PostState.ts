import { Post } from '../types/Post';

export type PostState = {
  posts: Post[];
  error: string | undefined;
};
