import React from 'react';
/*
 local files
 */
import { helpers } from 'utils';
import CommentInput from '../CommentInput';
import { CommentProps } from './types';
import styles from './CommentItem.module.scss';

const CommentItem = ({
  data,
  onReply,
  onSubmitReply,
  isInputVisible,
}: CommentProps) => {
  return (
    <article className="flex mt-5">
      <div>
        <img
          className="w-8 h-8  rounded-2xl"
          src={data.user_image}
          alt={`${data.user_name}_image`}
        />
      </div>
      <div className="ml-2">
        <div className="flex items-center mt-1">
          <h3 className="text-md font-bold text-black">{data.user_name}</h3>
          <h6 className="text-xs text-grey100 ml-1">
            {helpers.getTime(data.date)}
          </h6>
        </div>
        <p className="text-sm text-black mt-1">{data.comment}</p>
        <div className="mt-1">
          <button className="text-grey200 font-bold" onClick={onReply}>
            Reply
          </button>
          {isInputVisible && <CommentInput onSubmitReply={onSubmitReply} />}
        </div>
      </div>
    </article>
  );
};

export default CommentItem;
