import { Comments } from 'types';

export type CommentsListProps = {
  data: Comments;
  onReply: () => void;
  onSubmitReply: () => void;
  isInputVisible: boolean;
};
