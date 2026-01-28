import { bAuthGET, bAuthPOST, bAuthPATCH, bAuthDELETE, bGET } from '@/utils/axios/http';
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

  const url = `/v1/comments/post/${postId}?${params.toString()}`;

  if (token) {
    return bAuthGET<CommentsListResponse>(url, token);
  }

  return bGET<CommentsListResponse>(url);
};

export const getCommentById = async (id: string, token?: string): Promise<Comment> => {
  const url = `/v1/comments/${id}`;

  if (token) {
    return bAuthGET<Comment>(url, token);
  }

  return bGET<Comment>(url);
};

export const createComment = async (
  data: CreateCommentRequest,
  token: string
): Promise<Comment> => {
  return bAuthPOST<CreateCommentRequest, Comment>('/v1/comments', data, token);
};

export const updateComment = async (
  id: string,
  data: UpdateCommentRequest,
  token: string
): Promise<Comment> => {
  return bAuthPATCH<UpdateCommentRequest, Comment>(`/v1/comments/${id}`, data, token);
};

export const deleteComment = async (id: string, token: string): Promise<void> => {
  await bAuthDELETE(`/v1/comments/${id}`, token);
};
