import type { UUID } from './base';

// #region User (минимальная версия для постов/комментов)

export type PostAuthor = {
  id: UUID;
  username: string;
  email?: string;
  image?: string | null;
};

// #endregion

// #region Post

export type Post = {
  id: UUID;
  title: string;
  content: string;
  excerpt?: string | null;
  published: boolean;
  authorId: UUID;
  author?: PostAuthor;
  likesCount?: number;
  commentsCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostRequest = {
  title: string;
  content: string;
  excerpt?: string;
  published?: boolean;
};

export type UpdatePostRequest = Partial<CreatePostRequest>;

export type PostsListResponse = {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// #endregion

// #region Comment

export type Comment = {
  id: UUID;
  content: string;
  postId: UUID;
  authorId: UUID;
  author?: PostAuthor;
  createdAt: string;
  updatedAt: string;
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

// #endregion

// #region Likes

export type LikeToggleResponse = {
  liked: boolean;
  likesCount: number;
};

export type LikeStatusResponse = {
  liked: boolean;
};

export type LikesCountResponse = {
  count: number;
};

export type LikesUsersResponse = {
  users: PostAuthor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// #endregion
