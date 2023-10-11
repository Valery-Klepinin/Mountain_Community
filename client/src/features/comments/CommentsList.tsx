import React from 'react';
import Comment from '../tracks/types/Comment';
import './commentsList.scss';

type CommentsListProps = {
  comment: Comment;
};

export default function CommentsList({
  comment,
}: CommentsListProps): JSX.Element {
  return (
    <div className="comment">
      <div className="comment-text">{comment.text}</div>
      <div className="comment-name">{comment.User.name}</div>
    </div>
  );
}
