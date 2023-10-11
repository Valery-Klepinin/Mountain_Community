import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addComments, requestComments } from '../tracks/api';
import { RootState } from '../../store';
import Comment from '../tracks/types/Comment';
import CommentState from './CommentState';

const initialState: CommentState = {
  comments: [],
  error: null,
};

export const pushComments = createAsyncThunk(
  'comments/add',
  (payload: { trackId: number; text: string }) => {
    const { trackId, text } = payload;
    return addComments(trackId, text);
  }
);

export const loadComments = createAsyncThunk(
  'comments/load',
  (payload: { trackId: number }) => {
    const { trackId } = payload;
    return requestComments(trackId);
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.error = null;
    });
    builder.addCase(loadComments.rejected, (state, action) => {
      state.error = action.payload as string;
    });
    builder.addCase(pushComments.fulfilled, (state, action) => {
      state.comments = [...state.comments, action.payload];
      state.error = null;
    });

    builder.addCase(pushComments.rejected, (state, action) => {
      state.comments = [];
      state.error =
        action.error.message || 'Произошла ошибка загрузки комментариев';
    });
  },
});

export const selectComments = (state: RootState): Comment[] =>
  state.comments.comments;

export default commentSlice.reducer;
