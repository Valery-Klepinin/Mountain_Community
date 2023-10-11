import React, { useEffect, useMemo, useState } from 'react';
import Card from '@mui/material/Card';
import Carousel from 'react-material-ui-carousel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTracks, updateTrackRating } from './trackSlice';
import Track from './types/Track';
import Item from './Item';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeightIcon from '@mui/icons-material/Height';
import HikingIcon from '@mui/icons-material/Hiking';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './trackPage.scss';

import MyMap from './Map';
import CommentForm from '../comments/CommentForm';
import { Rating } from '@mui/material';
import { useAppDispatch } from '../../store';
import {
  loadFavorites,
  selectFavorites,
  toggleFromFavoritesAsync,
} from '../favorites/favoritesSlice';
import { selectUser } from '../user/redux/userSlice';


type TracksListProps = {
  loading: boolean;
};

export default function TrackPage({ loading }: TracksListProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const favorites = useSelector(selectFavorites);
  const navigate = useNavigate();
  const { id } = useParams();

  const tracks = useSelector(selectTracks);
  const user = useSelector(selectUser);

  const [btn, setBtn] = useState(
    () =>
      favorites.length > 0 &&
      favorites.some((fav) => fav.trackId === Number(id))
  );
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch, btn]);
  const track = useMemo((): Track | undefined => {
    return tracks.find((t) => t.id === Number(id));
  }, [id, tracks]);
  const [localRating, setLocalRating] = useState(track ? track.rating : 0);
  const handleRatingChange = (newValue: number): void => {
    setLocalRating(newValue);
    dispatch(
      updateTrackRating({ trackId: track ? track.id : 0, rating: newValue })
    );
  };

  const toggleFavorite: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    dispatch(toggleFromFavoritesAsync({ trackId: track ? track.id : 0 }));
    setBtn((prev) => !prev);
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
    <div>
      <button className="back" type="button" onClick={() => navigate(-1)}>
        <ArrowBackIcon fontSize="large" />
      </button>
      <Card id="track" sx={{ maxWidth: 345 }}>
        <Carousel className="track-carousel">
          {track &&
            track.Images.map((image, i) => <Item key={i} image={image} />)}
        </Carousel>
        <CardContent>
          <div className="track-metric">
            <p>
              <HikingIcon />
              {track && track.length / 1000}км
            </p>
            <p>
              <HeightIcon />
              {track?.height}м
            </p>
            <p>
              <AccessTimeIcon />
              {track && track.time !== undefined && formatTime(track.time)}
            </p>
          </div>
          <Typography
            className="favorite-title"
            gutterBottom
            variant="h5"
            component="div"
          >
            {track?.title}
            {user && (
              <button className="favorite-btn" onClick={toggleFavorite}>
                {btn ? (
                  <FavoriteIcon fontSize="large" />
                ) : (
                  <FavoriteBorderIcon fontSize="large" />
                )}
              </button>
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {track?.description}
          </Typography>
          <Typography className="legend" component="legend">
            Рейтинг: {track?.rating.toFixed(1)}
          </Typography>
          {user ? (
            <Rating
              name="track-rating"
              value={localRating}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  handleRatingChange(newValue);
                }
              }}
            />
          ) : (
            <Rating name="read-only" value={localRating} readOnly />
          )}
        </CardContent>
        <CardActions></CardActions>
        <div id="myMap">
          <MyMap id={Number(id)} />
        </div>
      </Card>
      <CommentForm trackId={Number(id)} />
    </div>
  );
}
