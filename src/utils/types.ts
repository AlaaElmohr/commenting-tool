import { Comment, Comments } from 'types';

export interface addCommentParams {
  (comments: Comment, newComment: Comment, commentId: string): void;
}

export interface findCommentParams {
  (comments: Comment, commentId: string): Comment | null;
}

export interface setMainThreadParams {
  (comments: Comment, commentId: string): Comment;
}

export interface getTimeParams {
  (timestamp: number): string;
}

export interface Helpers {
  addComment: addCommentParams;
  findComment: findCommentParams;
  getTime: getTimeParams;
  setMainThread: setMainThreadParams;
}
