import React, { useState } from 'react';
/*
 local files
 */
import { CommentInputProps } from './types';

const CommentInput = ({ onSubmitReply }: CommentInputProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    onSubmitReply(comment);
    setComment('');
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="write a comment..."
        className="p-2 rounded-xl border-2 border-lightGrey mt-4 text-black text-sm w-full"
        onChange={event => setComment(event.target.value)}
        value={comment}
      />
    </form>
  );
};

export default CommentInput;
