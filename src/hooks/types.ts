import { Comments } from 'types';
import { RawDraftContentState } from 'draft-js';

export interface CommentParams {
  (
    id: string | null,
    parentId: string | null,
    comment: string | RawDraftContentState,
  ): void;
}

export interface CommentsState {
  allData: Comments;
  data: Comments;
  thread: Comments;
  page: number;
  total: number;
  limit: number;
}

export enum CommentsActionsTypes {
  SET = 'set',
  UPDATE = 'update',
  ADD = 'add',
  SETTHREAD = 'set thread',
}

export interface CommentsAction {
  type: CommentsActionsTypes;
  payload: any;
}
