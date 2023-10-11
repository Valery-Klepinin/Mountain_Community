import Rating from './types/Rating';

type RatingState = {
  ratings: Rating[];
  error: string | null;
};

export default RatingState;
