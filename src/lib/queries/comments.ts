import { api } from '@/lib/api';
import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentsListResponse,
} from '@/types/post';

export const getCommentsByPost = async (
  postId: string,
  page: number = 1,
  limit: number = 20,
  token?: string
): Promise<CommentsListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return api.get<CommentsListResponse>(
    `/v1/comments/post/${postId}?${params.toString()}`,
    token
  );
};

export const getCommentById = async (id: string, token?: string): Promise<Comment> =>
  api.get<Comment>(`/v1/comments/${id}`, token);

export const createComment = async (
  data: CreateCommentRequest,
  token: string
): Promise<Comment> => api.post<Comment, CreateCommentRequest>('/v1/comments', data, token);

export const updateComment = async (
  id: string,
  data: UpdateCommentRequest,
  token: string
): Promise<Comment> =>
  api.patch<Comment, UpdateCommentRequest>(`/v1/comments/${id}`, data, token);

export const deleteComment = async (id: string, token: string): Promise<void> =>
  api.delete<void>(`/v1/comments/${id}`, token);
