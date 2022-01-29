import { Comment } from 'types';

export type CommentProps = {
  data: Comment;
  onReply: () => void;
  onSubmitReply: () => void;
  isInputVisible: boolean;
};
