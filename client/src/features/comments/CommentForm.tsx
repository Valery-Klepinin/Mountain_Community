import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { loadComments, pushComments, selectComments } from './commentSlice';
import CommentsList from './CommentsList';
import { Box, Button, TextField } from '@mui/material';
import { selectUser } from '../user/redux/userSlice';
import './commentForm.scss';

type CommentFormProps = {
  trackId: number;
};

function CommentForm({ trackId }: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const comments = useSelector(selectComments);
  const user = useSelector(selectUser);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(loadComments({ trackId }));
  }, [trackId, dispatch]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    if (text) {
      dispatch(pushComments({ trackId, text }));
    }
    setText('');
  };

  return (
    <div className="comments-container">
      <div className="comments-container-inner">
        {comments.map((comment) => (
          <CommentsList comment={comment} key={comment.id} />
        ))}
      </div>
      <form className="comments-container-form" onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          {user ? (
            <>
              <TextField
                className="comment-field"
                fullWidth
                label="Напишите комментарий"
                id="fullWidth"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button className="comment-btn" type="submit" variant="outlined">
                Отправить
              </Button>
            </>
          ) : (
            <div className="add">
              <div className="comment">
                Зарегистрируйтесь или войдите, чтобы оставить комментарий
              </div>
            </div>
          )}
        </Box>
      </form>
    </div>
  );
}

export default CommentForm;
