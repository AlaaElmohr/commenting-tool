import { Comment, Comments } from 'types';

export interface findAndAddCommentParams {
  (comments: Comment, newComment: Comment, commentId: string): void;
}

export interface getTimeParams {
  (timestamp: number): string;
}

export interface Helpers {
  addComment: findAndAddCommentParams;
  getTime: getTimeParams;
}
