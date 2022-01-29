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
