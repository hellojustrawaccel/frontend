import { api } from '@/lib/api';
import type {
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  PostsListResponse,
} from '@/types/post';

export const getPosts = async (
  page: number = 1,
  limit: number = 10,
  published?: boolean,
  token?: string
): Promise<PostsListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (published !== undefined) {
    params.append('published', published.toString());
  }

  return api.get<PostsListResponse>(`/v1/posts?${params.toString()}`, token);
};

export const getPostsByAuthor = async (
  authorId: string,
  page: number = 1,
  limit: number = 10,
  token?: string
): Promise<PostsListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return api.get<PostsListResponse>(
    `/v1/posts/author/${authorId}?${params.toString()}`,
    token
  );
};

export const getPostById = async (id: string, token?: string): Promise<Post> =>
  api.get<Post>(`/v1/posts/${id}`, token);

export const createPost = async (data: CreatePostRequest, token: string): Promise<Post> =>
  api.post<Post, CreatePostRequest>('/v1/posts', data, token);

export const updatePost = async (
  id: string,
  data: UpdatePostRequest,
  token: string
): Promise<Post> => api.patch<Post, UpdatePostRequest>(`/v1/posts/${id}`, data, token);

export const deletePost = async (id: string, token: string): Promise<void> =>
  api.delete<void>(`/v1/posts/${id}`, token);
