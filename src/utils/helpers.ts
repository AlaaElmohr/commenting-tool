import moment from 'moment';
/*
local files
*/
import { Helpers } from './types';

const helpers: Helpers = {
  addComment: (parentComment, newComment, commentId) => {
    //if the parent comment has threads, then search with comment id to get the targeted thread.
    if (parentComment.threads && parentComment.threads.length > 0) {
      const filteredComments = parentComment.threads.filter(
        comment => comment._id === commentId,
      );
      //if the target thread exists in parent comment threads, then push the new comment to it.
      if (filteredComments && filteredComments.length > 0) {
        filteredComments[0]?.threads?.unshift(newComment);
      } else {
        //if not loop into every comment in the threads and do the same cycle.
        parentComment.threads.forEach(comment =>
          helpers.addComment(comment, newComment, commentId),
        );
      }
    } else {
      //if it doesn't have threads, then push the new comment to it.
      if (commentId === parentComment._id) {
        parentComment?.threads?.unshift(newComment);
      }
    }
  },
  getTime: time => {
    const sinceNow = moment(time).fromNow();

    return sinceNow;
  },
};

export default helpers;
