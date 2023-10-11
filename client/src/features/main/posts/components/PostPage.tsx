import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Post } from '../types/Post';
import { selectPost } from '../redux/postSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './postPage.scss';

type TracksListProps = {
  loading: boolean;
};

function PostPage({ loading }: TracksListProps): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const posts = useSelector(selectPost);

  const post = useMemo((): Post | undefined => {
    return posts.find((post) => post.id === Number(id));
  }, [id, posts]);

  return (
    <div className="post-container-inner">
      <button className="back" type="button" onClick={() => navigate(-1)}>
        <ArrowBackIcon fontSize="large" />
      </button>
      <h2 className="post-title">{post?.title}</h2>
      <div className="post-item">
        <div className="post-post">
          <img className="post-img" src={post?.img} alt="картинка" />
          <div className="post-description">{post?.description}</div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
