import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTracks } from '../../tracks/trackSlice';
import TrackItem from '../../tracks/TrackItem';
import User from '../../user/types/User';
import './topTracksList.scss';

type TracksListProps = {
  loading: boolean;
  user: User | undefined;
};

export default function TopTracksList({
  loading,
  user,
}: TracksListProps): JSX.Element {
  const tracks = useSelector(selectTracks);

  const [topTracks, setTopTracks] = useState([...tracks]);

  const topTracksArray = useMemo(() => {
    return tracks.filter((track) => track.rating >= 4);
  }, [tracks]);

  useEffect(() => {
    if (!loading) {
      setTopTracks(topTracksArray);
    }
  }, [loading, topTracksArray]);

  return (
    <>
      <h2 className="top-track-title">Топ маршрутов</h2>
      <div className="top-container">
        {topTracks.map((track) => (
          <TrackItem track={track} key={track.id} user={user} />
        ))}
      </div>
    </>
  );
}
