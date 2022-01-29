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
  data: [],
};

const useComment = () => {
  const [state, dispatch] = useReducer(
    (state: CommentsState, { payload, type }: CommentsAction) => {
      switch (type) {
        case CommentsActionsTypes.UPDATE:
          return {
            ...state,
            data: payload,
          };
        default:
          return state;
      }
    },
    initialState,
  );

  useEffect(() => {
    dispatch({
      type: CommentsActionsTypes.UPDATE,
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

  return {
    ...state,
    addComment,
  };
};

export default useComment;
