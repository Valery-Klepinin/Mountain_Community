export type Post = {
  id: number;
  title: string | undefined;
  description: string | undefined;
  img: string | undefined;
};

export type PostWithoutId = Omit<Post, 'id'>;
