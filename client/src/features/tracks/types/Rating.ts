import User from '../../user/types/User';

type Rating = {
  id: number;
  userId: number;
  trackId: number;
  rating: string;
  User: User;
};

export default Rating;
