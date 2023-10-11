import Comment from '../tracks/types/Comment';

type CommentState = {
  comments: Comment[];
  error: string | null;
};

export default CommentState;
