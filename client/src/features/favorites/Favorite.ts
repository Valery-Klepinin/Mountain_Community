import Track from '../tracks/types/Track';

type Favorite = {
  userId: number;
  trackId: number;
  Track: Track;
};
export default Favorite;
