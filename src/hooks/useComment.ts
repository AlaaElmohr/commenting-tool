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
  page: 1,
  total: 0,
  limit: 5,
};

const useComment = () => {
  const [state, dispatch] = useReducer(
    (state: CommentsState, { payload, type }: CommentsAction) => {
      const { limit, page, allData, data } = state;

      switch (type) {
        case CommentsActionsTypes.ADD:
          return {
            ...state,
            allData: payload,
            data: payload.slice(0, limit),
            total: payload.length,
            page: 1,
          };
        case CommentsActionsTypes.UPDATE:
          return {
            ...state,
            data: [...data, ...allData.slice(page * limit, limit * (page + 1))],
            page: page + 1,
          };
        default:
          return state;
      }
    },
    initialState,
  );

  useEffect(() => {
    dispatch({
      type: CommentsActionsTypes.ADD,
      payload: CommentsData,
    });
  }, []);

  const addComment: CommentParams = (id, parentId, comment) => {
    let commentsList = [...state.data];
    const newComment: Comment = {
      ...userData,
      comment,
      date: new Date().getTime(),
      parent_id: id,
      _id: nanoid(),
    };

    if (parentId === null || id === null) {
      //if there is no id this mean that this a comment not a thread, then push it at the beginning of the comments list.
      commentsList.unshift(newComment);
    } else {
      //to handle the thread, get the top level comment with the parentId, then find the target thread and push the new comment to it.
      const parentComment = commentsList.filter(
        comment => comment._id === parentId,
      );

      helpers.addComment(parentComment[0], newComment, id);
    }

    dispatch({
      type: CommentsActionsTypes.UPDATE,
      payload: commentsList,
    });
  };

  const onLoadMore = () => {
    console.log('totalm,', state.total, state.data.length);
    if (state.total >= state.data.length) {
      console.log('Hello');
      dispatch({
        type: CommentsActionsTypes.UPDATE,
        payload: '',
      });
    }
  };

  return {
    ...state,
    addComment,
    onLoadMore,
  };
};

export default useComment;
