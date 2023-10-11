import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addPostFetch, deletePost, getPosts, updatePost } from './api';
import { PostState } from './PostState';
import { Post } from '../types/Post';
import { RootState } from '../../../../store';
import { Payload } from '../../../tracks/types/Payload';

const initialState: PostState = {
  posts: [],
  error: undefined,
};

export const loadPosts = createAsyncThunk('posts/loadPosts', () => {
  return getPosts();
});

export const addPosts = createAsyncThunk(
  'posts/addPosts', (formData: FormData) =>
  addPostFetch(formData)
);

export const deletePosts = createAsyncThunk(
  'posts/deletePosts',
  (post: number) => {
    return deletePost(post);
  }
);

export const updatePosts = createAsyncThunk(
  'tracks/updatePosts',
  (obj: Payload) => {
    return updatePost(obj);
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.error = undefined;
    });
    builder.addCase(loadPosts.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
    });
    builder.addCase(addPosts.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
      state.error = undefined;
    });
    builder.addCase(addPosts.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
    });
    builder.addCase(deletePosts.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.error = undefined;
    });
    builder.addCase(deletePosts.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
    });
    builder.addCase(updatePosts.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
      state.error = undefined;
    });
    builder.addCase(updatePosts.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload as string;
    });
  },
});

export const selectPost = (state: RootState): Post[] => state.post.posts;

export default postSlice.reducer;
