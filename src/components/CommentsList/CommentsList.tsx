import React from 'react';
/*
local files
*/
import CommentItem from '../CommentItem';
import { CommentsListProps } from './types';
const CommentsList = ({
  data,
  onReply,
  onSubmitReply,
  isInputVisible,
}: CommentsListProps) => {
  return (
    <>
      {data.map(comment => (
        <CommentItem
          key={comment._id}
          data={comment}
          onReply={onReply}
          onSubmitReply={onSubmitReply}
          isInputVisible={isInputVisible}
        />
      ))}
    </>
  );
};

export default CommentsList;
