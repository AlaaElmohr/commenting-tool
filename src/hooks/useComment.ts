import { useEffect, useReducer } from 'react';
import { nanoid } from 'nanoid';
/*
local files
*/
import { helpers } from 'utils';
import { CommentsData, userData } from 'data';
import {
  CommentParams,
  CommentsActionsTypes,
  CommentsAction,
  CommentsState,
} from './types';
import { Comment } from 'types';

const initialState = {
  allData: [],
  data: [],
  thread: [],
  page: 1,
  total: 0,
  limit: 5,
};

const useComment = () => {
  const [state, dispatch] = useReducer(
    (state: CommentsState, { payload, type }: CommentsAction) => {
      const { limit, page, allData, data } = state;

      switch (type) {
        case CommentsActionsTypes.SET:
          //get the initial 5 items
          return {
            ...state,
            allData: payload,
            data: payload.slice(0, limit),
            total: payload.length,
            page: 1,
          };
        case CommentsActionsTypes.ADD:
          //handle adding new comments by updating original data with new one
          return {
            ...state,
            allData: payload,
            data: payload.slice(0, data.length),
            total: payload.length,
          };
        case CommentsActionsTypes.UPDATE:
          //handle loading more by adding more 5 items from the original data.
          return {
            ...state,
            data: [...data, ...allData.slice(page * limit, limit * (page + 1))],
            page: page + 1,
          };
        case CommentsActionsTypes.SETTHREAD:
          return {
            ...state,
            thread: payload,
          };

        default:
          return state;
      }
    },
    initialState,
  );

  useEffect(() => {
    dispatch({
      type: CommentsActionsTypes.SET,
      payload: CommentsData,
    });
  }, []);

  const addComment: CommentParams = (id, parentId, comment) => {
    let commentsList = [...state.allData];

    //new comment
    const newComment: Comment = {
      ...userData,
      comment,
      date: new Date().getTime(),
      parent_id: parentId,
      _id: nanoid(),
      threads: [],
    };

    if (parentId === null && id === null) {
      //if there is no id or parent id this mean that this a comment not a thread, then push it at the beginning of the comments list.
      commentsList.unshift(newComment);
    } else if (parentId === null && id) {
      //this means that user try to comment on the main comments not on nested threads.
      const targetedComment = commentsList.filter(
        comment => comment._id === id,
      );

      targetedComment[0].threads.unshift(newComment);
    } else {
      //to handle the thread, get the top level comment with the parentId, then find the target thread and push the new comment to it.
      const parentComment = commentsList.filter(
        comment => comment._id === parentId,
      );

      helpers.addComment(parentComment[0], newComment, id);
    }

    dispatch({
      type: CommentsActionsTypes.ADD,
      payload: commentsList,
    });
  };

  const onLoadMore = () => {
    if (state.total >= state.data.length) {
      dispatch({
        type: CommentsActionsTypes.UPDATE,
        payload: '',
      });
    }
  };

  const getThread = (id: string, parentId: string | null) => {
    let data = [...state.allData];
    let parentComment = [];

    //get the top level comment for the thread
    if (parentId === null) {
      parentComment = data.filter(comment => comment._id === id);
    } else {
      parentComment = data.filter(comment => comment._id === parentId);
    }

    if (parentComment.length > 0) {
      //get the target thread
      const targetedThread = helpers.findComment(parentComment[0], id);

      if (targetedThread !== null) {
        //make this target thread as a top level comment by changing its thread children parentId's to its commentId.
        targetedThread.parent_id = null;
        const mainThread = helpers.setMainThread(targetedThread, id);

        dispatch({
          type: CommentsActionsTypes.SETTHREAD,
          payload: [mainThread],
        });
      }
    }

    // scroll to the top of window smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const removeThread = () => {
    dispatch({
      type: CommentsActionsTypes.SETTHREAD,
      payload: [],
    });
  };

  return {
    ...state,
    addComment,
    onLoadMore,
    getThread,
    removeThread,
  };
};

export default useComment;
