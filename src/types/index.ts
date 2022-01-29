export interface Comment {
  _id: string;
  user_name: string;
  user_image: string;
  user_id: string;
  comment: string;
  date: number;
  parent_id: string | null;
  threads?: Threads;
}

export interface Threads extends Array<Comment> {}

export interface Comments extends Array<Comment> {}

export type SubmitReplyParams = {
  (id: string | null, parentId: string | null, comment: string): void;
};

export type OnReplyParams = {
  (id: string | null): void;
};

export type Input = {
  [key: string]: string;
};
