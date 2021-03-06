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
  getThread,
) => {
  return (
    <>
      {data.map((comment, index) => (
        <div key={comment._id}>
          <CommentItem
            data={comment}
            onReply={onReply}
            onSubmitReply={onSubmitReply}
            visibleInputs={visibleInputs}
            level={level}
          >
            <>
              {comment.threads ? (
                //if the thread is 6 in depth and has more comments then show Continue this thread to start new thread.
                comment.threads.length >= 1 && level >= 6 ? (
                  <button
                    className="mt-3 font-bold text-black underline"
                    style={{ marginLeft: level * 20 + 30 }}
                    onClick={() => getThread(comment._id, comment.parent_id)}
                  >
                    Continue this thread
                  </button>
                ) : (
                  renderComments(
                    comment.threads,
                    onReply,
                    onSubmitReply,
                    visibleInputs,
                    level + 1,
                    getThread,
                  )
                )
              ) : null}
            </>
          </CommentItem>
        </div>
      ))}
    </>
  );
};

const CommentsList = ({
  data,
  onReply,
  onSubmitReply,
  visibleInputs,
  getThread,
}: CommentsListProps) => {
  return (
    <>
      {renderComments(
        data,
        onReply,
        onSubmitReply,
        visibleInputs,
        0,
        getThread,
      )}
    </>
  );
};

export default CommentsList;
