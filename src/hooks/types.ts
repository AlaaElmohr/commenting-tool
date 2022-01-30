import { Comments } from 'types';

export interface CommentParams {
  (id: string | null, parentId: string | null, comment: string): void;
}

export interface CommentsState {
  allData: Comments;
  data: Comments;
  page: number;
  total: number;
  limit: number;
}

export enum CommentsActionsTypes {
  UPDATE = 'update',
  ADD = 'add',
}

export interface CommentsAction {
  type: CommentsActionsTypes;
  payload: any;
}
