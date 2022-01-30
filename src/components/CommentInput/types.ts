import { Comment, SubmitReplyParams } from 'types';
import { RawDraftContentState } from 'draft-js';

export type CommentInputProps = {
  onCancel?: () => void;
  forReply: boolean;
  onSubmitReply: (comment: string | RawDraftContentState) => void;
};
