import React from 'react';
import { useSelector } from 'react-redux';

import PostItem from './PostItem';
import User from '../../../user/types/User';
import { selectPost } from '../redux/postSlice';
import './postList.scss';

type UserPropsType = {
  user: User | undefined;
};

function PostList({ user }: UserPropsType): JSX.Element {
  const posts = useSelector(selectPost);

  return (
    <div className="postContainer">
      {posts.map((post) => (
        <PostItem post={post} key={post.id} user={user} />
      ))}
    </div>
  );
}

export default PostList;
