import { Link } from 'react-router-dom';
import { Post } from '../types/Post';
import User from '../../../user/types/User';
import { useAppDispatch } from '../../../../store';
import { deletePosts } from '../redux/postSlice';
import './postItem.scss';
import { Button } from '@mui/material';

type PostPropsType = {
  post: Post;
  user: User | undefined;
};

function PostItem({ post, user }: PostPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(deletePosts(post.id));
  };

  return (
    <div className="post-container">
      <Link className="post-container-link" to={`/posts/${post.id}`}>
        <div className="postItem">
          <img className="postImg" src={post.img} alt="картинка" />
          <p className="post-container-p">{post.title}</p>
        </div>
      </Link>
      {user && user.isAdmin && (
        <div className="post-container-btns">
          <Link to={`/posts/update/${post.id}`}>
            <Button className="post-container-btns-del" type="button">
              Изменить
            </Button>
          </Link>
          <Button
            className="post-container-btns-update"
            type="button"
            onClick={handleDelete}
          >
            Удалить
          </Button>
        </div>
      )}
    </div>
  );
}

export default PostItem;
