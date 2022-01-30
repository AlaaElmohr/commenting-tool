import { Comments, OnReplyParams, SubmitReplyParams, Input } from 'types';

export type CommentsListProps = {
  data: Comments;
  onReply: OnReplyParams;
  onSubmitReply: SubmitReplyParams;
  visibleInputs: Input;
  getThread: (id: string, parentId: string | null) => void;
};

export type CommentsListParams = {
  (
    data: Comments,
    onReply: OnReplyParams,
    onSubmitReply: SubmitReplyParams,
    visibleInputs: Input,
    level: number,
    getThread: (id: string, parentId: string | null) => void,
  ): void;
};
