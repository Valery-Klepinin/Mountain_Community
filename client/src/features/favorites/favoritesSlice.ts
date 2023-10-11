import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  requestFavorites,
  toggleFavorites,
} from './api';
import FavoriteState from './FavoriteState';
import Favorite from './Favorite';

const initialState: FavoriteState = {
  favorites: [],
  error: null,
};

export const loadFavorites = createAsyncThunk('favorites/loadFavorites', () => {
  return requestFavorites();
});
export const toggleFromFavoritesAsync = createAsyncThunk(
  'favorites/toggleFavorites',
  async (payload: { trackId: number }) => {
    const { trackId } = payload;
    try {
      const res = await toggleFavorites(trackId);
      return res;
    } catch (error) {
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.error = null;
    });
    builder.addCase(loadFavorites.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(toggleFromFavoritesAsync.fulfilled, (state, action) => {
      
      if (action.payload.hasOwnProperty('message')) {
        state.favorites = state.favorites.filter(
          (favorite) => favorite.trackId !== action.payload.trackId
        );
      } else {
        state.favorites = [...state.favorites, action.payload];
        state.error = null;
      }
    });
    builder.addCase(toggleFromFavoritesAsync.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const selectFavorites = (state: RootState): Favorite[] =>
  state.favorites.favorites;

export default favoritesSlice.reducer;
