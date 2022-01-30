import moment from 'moment';
/*
local files
*/
import { Helpers } from './types';

const helpers: Helpers = {
  findComment: (parentComment, commentId) => {
    //if the parent comment has threads, then search with comment id to get the targeted thread.
    //if it doesn't have threads, then push the new comment to it.
    if (parentComment.threads && parentComment.threads.length > 0) {
      const filteredComments = parentComment.threads.filter(
        comment => comment._id === commentId,
      );
      //if the target thread exists in parent comment threads, then push the new comment to it.
      if (filteredComments && filteredComments.length > 0) {
        return filteredComments[0];
      } else {
        for (let comment of parentComment.threads) {
          const finComment = helpers.findComment(comment, commentId);

          if (finComment) {
            return finComment;
          }
        }
      }
    } else {
      //if it doesn't have threads, then push the new comment to it.
      if (commentId === parentComment._id) {
        return parentComment;
      }
    }

    return null;
  },
  addComment: (parentComment, newComment, commentId) => {
    const getComment = helpers.findComment(parentComment, commentId);

    if (getComment !== null) {
      getComment?.threads?.unshift(newComment);
    }
  },
  getTime: time => {
    const sinceNow = moment(time).fromNow();

    return sinceNow;
  },
  setMainThread: (parentComment, commentId) => {
    const mainThread = { ...parentComment };

    if (mainThread.parent_id !== null) {
      mainThread.parent_id = commentId;
    }

    if (mainThread && mainThread.threads) {
      mainThread.threads.forEach(comment =>
        helpers.setMainThread(comment, commentId),
      );
    }

    return mainThread;
  },
};

export default helpers;
