import { Comments } from 'types';

export interface CommentParams {
  (id: string | null, parentId: string | null, comment: string): void;
}

export interface CommentsState {
  data: Comments;
}

export enum CommentsActionsTypes {
  UPDATE = 'update',
}

export interface CommentsAction {
  type: CommentsActionsTypes;
  payload: any;
}
