import React from 'react';
/*
 local files
 */
import { CommentInputProps } from './types';

const CommentInput = ({ onSubmitReply }: CommentInputProps) => {
  return (
    <form className="flex" onSubmit={() => onSubmitReply('', '', '')}>
      <input
        type="text"
        placeholder="write a comment..."
        className="p-2 rounded-xl border-2 border-lightGrey mt-4 text-black text-sm w-full"
      />
    </form>
  );
};

export default CommentInput;
