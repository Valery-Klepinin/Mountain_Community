import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch } from '../store';
import { check } from '../features/user/redux/userSlice';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import Header from './Header';
import RegisterFormPage from '../features/user/components/RegisterFormPage';
import LoginFormPage from '../features/user/components/LoginFormPage';
import TracksList from '../features/tracks/TracksList';
import TrackPage from '../features/tracks/TrackPage';

import UpdatePostPage from '../features/admin/UpdatePostPage';
import { loadTracks } from '../features/tracks/trackSlice';
import UpdateTrackPage from '../features/admin/UpdateTrackPage';
import AddPostPage from '../features/admin/AddPostPage';
import PostPage from '../features/main/posts/components/PostPage';
import FormAdd from '../features/admin/AddTrackPage';
import FavoriteList from '../features/favorites/FavoriteList';
import MapPage from '../features/tracks/MapPage';
import { loadFavorites } from '../features/favorites/favoritesSlice';
import Error from '../features/404/404';
import ScrollToTop from './Scroll';
import Prelouder from '../features/prelouder/Prelouder';
import { loadPosts } from '../features/main/posts/redux/postSlice';

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadTracks()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <Prelouder />
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main loading={loading} />} />
          <Route path="/tracks" element={<TracksList loading={loading} />} />
          <Route path="/map" element={<MapPage loading={loading}/>} />
          <Route path="/auth/register" element={<RegisterFormPage />} />
          <Route path="/auth/login" element={<LoginFormPage />} />
          <Route path="/posts/:id" element={<PostPage loading={loading}/>} />
          <Route path="/tracks/:id" element={<TrackPage loading={loading}/>} />
          <Route path="/favotites" element={<FavoriteList loading={loading}/>} />
          <Route path="/posts/update/:id" element={<UpdatePostPage loading={loading}/>} />
          <Route path="/posts/add" element={<AddPostPage loading={loading}/>} />
          <Route path="/tracks/update/:id" element={<UpdateTrackPage loading={loading}/>} />
          <Route path="/tracks/add/" element={<FormAdd loading={loading}/>} />
          <Route path="*" element={<Error />} />
          <Route element={<ScrollToTop />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
