import React from 'react';
/*
 local files
 */
import { helpers } from 'utils';
import { CommentInput, Avatar } from '..';
import { CommentProps } from './types';

const CommentItem: React.FC<CommentProps> = ({
  children,
  data,
  onReply,
  onSubmitReply,
  visibleInputs,
  level,
}) => {
  return (
    <>
      <article
        className={`flex mt-5 bg-white shadow-sm rounded-lg p-3`}
        style={{ marginLeft: level * 20 }}
      >
        <Avatar url={data.user_image} alt={`${data.user_name}_image`} />
        <div className="ml-2 w-full">
          <div className="flex items-center mt-1">
            <h3 className="text-md font-bold text-black">{data.user_name}</h3>
            <h6 className="text-xs text-grey100 ml-1">
              {helpers.getTime(data.date)}
            </h6>
          </div>
          <p className="text-sm text-black mt-1">{data.comment}</p>
          <div className="mt-1">
            <button
              className="text-grey200 font-bold"
              onClick={() => onReply(data._id)}
            >
              Reply
            </button>
            {visibleInputs.hasOwnProperty(data._id) &&
              visibleInputs[data._id] && (
                <CommentInput
                  onCancel={() => onReply(data._id)}
                  forReply
                  onSubmitReply={comment =>
                    onSubmitReply(data._id, data.parent_id, comment)
                  }
                />
              )}
          </div>
        </div>
      </article>
      {children}
    </>
  );
};

export default CommentItem;
