import { Comment, SubmitReplyParams } from 'types';
import { RawDraftContentState } from 'draft-js';

export type CommentInputProps = {
  onSubmitReply: (comment: string | RawDraftContentState) => void;
};
