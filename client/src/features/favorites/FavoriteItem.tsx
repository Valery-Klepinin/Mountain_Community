import Card from '@mui/material/Card';
import {
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Track from '../tracks/types/Track';
import { useAppDispatch } from '../../store';
import { loadFavorites, toggleFromFavoritesAsync } from './favoritesSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeightIcon from '@mui/icons-material/Height';
import HikingIcon from '@mui/icons-material/Hiking';

import './favoriteItem.scss';

type FavoriteItemProps = {
  favorite: Track;
  btn: boolean;
  setBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FavoriteItem({
  favorite,
  btn,
  setBtn,
}: FavoriteItemProps): JSX.Element {
  // const [btn, setBtn] = useState(false);
  const dispatch = useAppDispatch();
  const toggleFavorite: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    console.log('asdasdas');
    dispatch(toggleFromFavoritesAsync({ trackId: favorite.id }));
    setBtn(true);
  };
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch, btn]);

  function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursString = hours < 10 ? `${hours}` : `${hours}`;
    const minutesString =
      remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
    if (minutesString === '00') {
      if (hoursString === '1') {
        return `${hoursString} час`;
      }
      if (hoursString === '2') {
        return `${hoursString} часа`;
      }
      if (hoursString === '3') {
        return `${hoursString} часа`;
      }
      return `${hoursString} часов`;
    } else {
      return `${hoursString}ч ${minutesString} мин`;
    }
  }

  return (
    <div className="favorite-card">
      <Card className="track-card" sx={{ maxWidth: 500 }}>
        {/* <button className="favorite-btn" onClick={toggleFavorite}>
          {isFavorite ? (
            <FavoriteIcon fontSize="large" />
          ) : (
            <FavoriteBorderIcon fontSize="large" />
          )}
        </button> */}
        <Link to={`/tracks/${favorite.id}`}>
          <CardActionArea className="track-card-action">
            <CardMedia
              component="img"
              height="350"
              image={favorite.Images[0].img}
              alt="green iguana"
            />
            <CardContent>
              <div className="track-card-metric">
                <p>
                  <HikingIcon />
                  {favorite.length}м
                </p>
                <p>
                  <HeightIcon />
                  {favorite.height}м
                </p>
                <p>
                  <AccessTimeIcon />
                  {formatTime(favorite.time)}
                </p>
              </div>
              <Typography
                className="track-card-title"
                gutterBottom
                variant="h5"
                component="div"
              >
                {favorite.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="truncate-text"
              >
                {favorite.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>

        <div className="favorites-footer-container">
          <Typography component="legend" className="rating">
            Рейтинг: {favorite.rating.toFixed(1)}
          </Typography>
          {/* {user && user.isAdmin && (
          <>
            <Link to={`/tracks/update/${favorite.id}`}>
              <button type="button">Изменить</button>
            </Link>
            <button type="button" onClick={handleDelete}>
              Удалить
            </button>
          </>
        )} */}
          <Button className="track-btn-delete" onClick={toggleFavorite}>
            Удалить из избранного
          </Button>
        </div>
      </Card>
    </div>
  );
}
