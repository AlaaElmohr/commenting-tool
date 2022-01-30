import { Comments } from 'types';

export interface CommentParams {
  (id: string | null, parentId: string | null, comment: string): void;
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
  UPDATE = 'update',
  ADD = 'add',
  SETTHREAD = 'set thread',
}

export interface CommentsAction {
  type: CommentsActionsTypes;
  payload: any;
}
