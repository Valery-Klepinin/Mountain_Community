import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './features/user/redux/userSlice';
import postReducer from './features/main/posts/redux/postSlice';
import tracksReducer from './features/tracks/trackSlice';
import commentReducer from './features/comments/commentSlice';
import favoritesReducer from './features/favorites/favoritesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    tracks: tracksReducer,
    comments: commentReducer,
    favorites: favoritesReducer,
  },
});

// для правильной типизации будем использовать useAppDispatch вместоuseDispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
