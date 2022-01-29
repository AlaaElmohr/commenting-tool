import { Comment, SubmitReplyParams } from 'types';

export type CommentInputProps = {
  onSubmitReply: (comment: string) => void;
};
