import Coordinate from './Coordinate';
import Favorite from '../../favorites/Favorite';
import Image from './Image';

type Track = {
  id: number;
  title: string;
  description: string;
  rating: number;
  length: number;
  tent: boolean;
  waterfield: boolean;
  bicycle: boolean;
  time: number;
  height: number;
  Images: Image[];

  Coordinates: Coordinate[];
  Favorites: Favorite[];
};

export type TrackPage = Track & {
  Comments: Comment[];
};

export type TrackWithoutId = Omit<Track, 'id'>;

export default Track;
