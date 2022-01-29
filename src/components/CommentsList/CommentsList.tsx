import React from 'react';
/*
local files
*/
import CommentItem from '../CommentItem';
import { CommentsListProps, CommentsListParams } from './types';

const renderComments: CommentsListParams = (
  data,
  onReply,
  onSubmitReply,
  visibleInputs,
  level,
) => {
  return (
    <>
      {data.map((comment, index) => (
        <>
          <CommentItem
            key={comment._id}
            data={comment}
            onReply={onReply}
            onSubmitReply={onSubmitReply}
            visibleInputs={visibleInputs}
            level={level}
          />
          {comment.threads &&
            renderComments(
              comment.threads,
              onReply,
              onSubmitReply,
              visibleInputs,
              level + 1,
            )}
        </>
      ))}
    </>
  );
};

const CommentsList = ({
  data,
  onReply,
  onSubmitReply,
  visibleInputs,
}: CommentsListProps) => {
  return <>{renderComments(data, onReply, onSubmitReply, visibleInputs, 0)}</>;
};

export default CommentsList;
