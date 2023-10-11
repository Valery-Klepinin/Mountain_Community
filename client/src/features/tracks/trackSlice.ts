import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TrackState from './redux/TrackState';
import { RootState } from '../../store';
import {
  addRatingFetch,
  addTrackFetch,
  requestTracks,
  updateTrackFetch,
} from './api';
import { deleteTrack } from './api';
import Track from './types/Track';
import { Payload } from './types/Payload';

const initialState: TrackState = {
  tracks: [],
  error: undefined,
  searchQuery: '',
  rating: 0,
};

export const addTrack = createAsyncThunk(
  'tracks/addTrack',
  (formData: FormData) => addTrackFetch(formData)
);

export const updateTrack = createAsyncThunk(
  'tracks/updateTrack',
  (obj: Payload) => {
    return updateTrackFetch(obj);
  }
);

export const loadTracks = createAsyncThunk('tracks/load', () => {
  return requestTracks();
});

export const deleteTracks = createAsyncThunk(
  'tracks/deleteTracks',
  (trackId: number) => {
    return deleteTrack(trackId);
  }
);

export const updateTrackRating = createAsyncThunk(
  'track/rating',
  (payload: { trackId: number; rating: number }) => {
    const { trackId, rating } = payload;
    return addRatingFetch(trackId, rating);
  }
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearState: (state) => {
      state.tracks = [];
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
      state.error = undefined;
    });
    builder.addCase(loadTracks.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(deleteTracks.fulfilled, (state, action) => {
      state.tracks = state.tracks.filter(
        (track) => track.id !== action.payload
      );
      state.error = undefined;
    });
    builder.addCase(deleteTracks.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
    });
    builder.addCase(addTrack.fulfilled, (state, action) => {
      state.tracks = [...state.tracks, action.payload];
    });
    builder.addCase(addTrack.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateTrack.fulfilled, (state, action) => {
      state.tracks = state.tracks.map((track) =>
        track.id === action.payload.id ? action.payload : track
      );
    });
    builder.addCase(updateTrack.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateTrackRating.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
    builder.addCase(updateTrackRating.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const selectTracks = (state: RootState): Track[] => state.tracks.tracks;
export const searchQuery = (store: RootState): string =>
  store.tracks.searchQuery;

export const { clearSearchQuery } = tracksSlice.actions;
export const { setSearchQuery } = tracksSlice.actions;
export default tracksSlice.reducer;
