import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/redux/userSlice';
import { Link } from 'react-router-dom';
import TopTracksList from '../features/main/topTracks/TopTrackList';
import PostList from '../features/main/posts/components/PostList';
import './main.scss';

type TracksListProps = {
  loading: boolean;
};

function Main({ loading }: TracksListProps): JSX.Element {
  const user = useSelector(selectUser);
  return (
    <>
      <div className="main-container">
        <h2>Статьи</h2>
        {user && user.isAdmin && (
          <Link className="main-container-link" to={'/posts/add'}>
            Добавить пост
          </Link>
        )}
      </div>
      <PostList user={user} />
      <TopTracksList loading={loading} user={user} />
    </>
  );
}

export default Main;
