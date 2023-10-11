import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadFavorites, selectFavorites } from './favoritesSlice';
import FavoriteItem from './FavoriteItem';
import { useAppDispatch } from '../../store';
import './favoriteList.scss';

type TracksListProps = {
  loading: boolean;
};

export default function FavoriteList({ loading }: TracksListProps): JSX.Element {
  const [btn, setBtn] = useState(false);
  const favorites = useSelector(selectFavorites);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch, btn]);

  return (
    <div className="favorites-container">
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <FavoriteItem
            favorite={favorite.Track}
            btn={btn}
            setBtn={setBtn}
            key={favorite.Track.id}
          />
        ))
      ) : (
        <h2>В вашем списке отсутствуют избранные треки</h2>
      )}
    </div>
  );
}
