import { Payload } from '../../../tracks/types/Payload';
import { Post } from '../types/Post';

export async function getPosts(): Promise<Post[]> {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  return posts;
}

export const addPostFetch = async (formData: FormData): Promise<Post> => {
  const res = await fetch('/api/posts/add', {
    method: 'POST',
    body: formData,
  });
  return res.json();
};

export async function deletePost(postId: number): Promise<number> {
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });
  return postId;
}

export const updatePost = async (obj: Payload): Promise<Post> => {
  const res = await fetch(`/api/posts/${obj.id}`, {
    method: 'PUT',
    body: obj.formData,
  });
  return res.json();
};