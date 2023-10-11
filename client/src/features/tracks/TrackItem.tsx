import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Rating } from '@mui/material';
import Track from './types/Track';
import { Link } from 'react-router-dom';
import './trackItem.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import User from '../user/types/User';
import { deleteTracks, updateTrackRating } from './trackSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeightIcon from '@mui/icons-material/Height';
import HikingIcon from '@mui/icons-material/Hiking';
import {
  loadFavorites,
  selectFavorites,
  toggleFromFavoritesAsync,
} from '../favorites/favoritesSlice';

type TrackItemProps = {
  track: Track;
  user: User | undefined;
};

export default function TrackItem({
  track,
  user,
}: TrackItemProps): JSX.Element {
  const [localRating, setLocalRating] = useState(track.rating);
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [btn, setBtn] = useState(
    () =>
      favorites.length > 0 && favorites.some((fav) => fav.trackId === track.id)
  );
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch, btn]);

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(deleteTracks(track.id));
  };
  const toggleFavorite: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    dispatch(toggleFromFavoritesAsync({ trackId: track.id }));
    setBtn((prev) => !prev);
  };
  const handleRatingChange = (newValue: number): void => {
    dispatch(updateTrackRating({ trackId: track.id, rating: newValue }));
    setLocalRating(newValue);
  };

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
    <div className="card-item">
      <Card className="track-card" sx={{ maxWidth: 500 }}>
        {user && (
          <button className="favorite-btn-track" onClick={toggleFavorite}>
            {btn ? (
              <FavoriteIcon fontSize="large" />
            ) : (
              <FavoriteBorderIcon fontSize="large" />
            )}
          </button>
        )}

        <CardMedia
          className="track-card-img"
          component="img"
          height="330"
          image={track.Images[0].img}
          alt="green iguana"
        />
        <CardContent>
          <div className="track-card-metric">
            <p>
              <HikingIcon />
              {track?.length / 1000}км
            </p>
            <p>
              <HeightIcon />
              {track?.height}м
            </p>
            <p>
              <AccessTimeIcon />
              {formatTime(track?.time)}
            </p>
          </div>
          <Link to={`/tracks/${track.id}`}>
            <CardActionArea className="track-card-action">
              <Typography
                className="track-card-title"
                gutterBottom
                variant="h5"
                component="div"
              >
                {track.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="truncate-text"
              >
                {track.description}
              </Typography>
            </CardActionArea>
          </Link>
        </CardContent>
        <Typography component="legend" className="rating">
          Рейтинг: {track.rating.toFixed(1)}
        </Typography>
        <div className="rating-container">
          {user ? (
            <Rating
              name="track-rating"
              value={localRating}
              className="rating-stars"
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  handleRatingChange(newValue);
                }
              }}
            />
          ) : (
            <Rating
              name="read-only"
              className="rating-stars"
              value={localRating}
              readOnly
            />
          )}
          <div>
            {user && user.isAdmin && (
              <>
                <Link to={`/tracks/update/${track.id}`}>
                  <Button className="track-btn-update" type="button">
                    Изменить
                  </Button>
                </Link>
                <Button
                  className="track-btn-delete"
                  type="button"
                  onClick={handleDelete}
                >
                  Удалить
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
