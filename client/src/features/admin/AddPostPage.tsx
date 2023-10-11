import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { addPosts } from '../main/posts/redux/postSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

type TracksListProps = {
  loading: boolean;
};

function AddPostPage({ loading }: TracksListProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const img = useRef<HTMLInputElement>(null);

  const handleAddPost = (e: React.FormEvent): void => {
    e.preventDefault();
    if (img.current?.files?.length) {
      let formData = new FormData();
      const file = img.current.files[0];
      formData.append('img', file);
      formData.append('title', title);
      formData.append('description', description);
      dispatch(addPosts(formData));
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
      onSubmit={handleAddPost}
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
        Добавить
      </Button>
    </Box>
  );
}

export default AddPostPage;
