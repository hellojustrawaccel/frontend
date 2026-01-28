export type Post = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    username: string;
    email: string;
    image: string | null;
  };
  likesCount?: number;
  commentsCount?: number;
  isLikedByUser?: boolean;
};

export type CreatePostRequest = {
  title: string;
  content: string;
  excerpt?: string;
  published: boolean;
};

export type UpdatePostRequest = {
  title?: string;
  content?: string;
  excerpt?: string;
  published?: boolean;
};

export type PostsListResponse = {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Comment = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    username: string;
  };
  post?: {
    id: string;
    title: string;
  };
};

export type CreateCommentRequest = {
  content: string;
  postId: string;
};

export type UpdateCommentRequest = {
  content: string;
};

export type CommentsListResponse = {
  comments: Comment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type LikeToggleResponse = {
  isLiked: boolean;
  likesCount: number;
};

export type LikeStatusResponse = {
  isLiked: boolean;
};

export type LikesCountResponse = {
  count: number;
};

export type LikeUser = {
  id: string;
  username: string;
  likedAt: string;
};

export type LikesUsersResponse = {
  users: LikeUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
