import User from '../../user/types/User';

type Comment = {
  id: number;
  userId: number;
  trackId: number;
  text: string;
  User: User;
};

export default Comment;
