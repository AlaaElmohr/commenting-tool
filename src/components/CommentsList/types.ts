import { Comments, OnReplyParams, SubmitReplyParams, Input } from 'types';

export type CommentsListProps = {
  data: Comments;
  onReply: OnReplyParams;
  onSubmitReply: SubmitReplyParams;
  visibleInputs: Input;
};

export type CommentsListParams = {
  (
    data: Comments,
    onReply: OnReplyParams,
    onSubmitReply: SubmitReplyParams,
    visibleInputs: Input,
    level: number,
  ): void;
};
