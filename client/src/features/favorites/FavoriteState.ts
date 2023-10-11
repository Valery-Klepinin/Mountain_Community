import Favorite from './Favorite';

type FavoriteState = {
  favorites: Favorite[];
  error: string | null;
};

export default FavoriteState;
