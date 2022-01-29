import { Comment, Input, OnReplyParams, SubmitReplyParams } from 'types';

export type CommentProps = {
  data: Comment;
  onReply: OnReplyParams;
  onSubmitReply: SubmitReplyParams;
  visibleInputs: Input;
  level: number;
};
