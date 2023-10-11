import React, { useState, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { Post } from '../main/posts/types/Post';
import { selectPost, updatePosts } from '../main/posts/redux/postSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

type TracksListProps = {
  loading: boolean;
};

function UpdatePostPage({ loading }: TracksListProps): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = useSelector(selectPost);

  const post = useMemo((): Post | undefined => {
    return posts.find((post) => post.id === Number(id));
  }, [id, posts]);

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const img = useRef<HTMLInputElement>(null);

  const handleUpdate = (e: React.FormEvent): void => {
    e.preventDefault();
    if (img.current?.files?.length) {
      let formData = new FormData();
      const file = img.current.files[0];
      formData.append('img', file);
      formData.append('title', title ?? '');
      formData.append('description', description ?? '');

      console.log('ggggggggggggggggggg');
      dispatch(updatePosts({ formData, id }));
    }
    navigate('/');
  };

  
  return (
    <Box
      component="form"
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: '1fr' },
        maxWidth: '60ch',
        gap: 2,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleUpdate}
    >
      <TextField
        id="outlined-basic"
        label="Заголовок"
        variant="outlined"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Описание"
        variant="outlined"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="description"
      />
      <input name="img" type="file" ref={img} multiple />
      <Button
        className="checkbox-btn"
        variant="contained"
        color="success"
        type="submit"
      >
        Изменить
      </Button>
    </Box>
  );
}

export default UpdatePostPage;
