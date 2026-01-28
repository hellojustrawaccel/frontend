import { bAuthGET, bAuthPOST, bAuthPATCH, bAuthDELETE, bGET } from '@/utils/axios/http';
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

  const url = `/v1/posts?${params.toString()}`;

  if (token) {
    return bAuthGET<PostsListResponse>(url, token);
  }

  return bGET<PostsListResponse>(url);
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

  const url = `/v1/posts/author/${authorId}?${params.toString()}`;

  if (token) {
    return bAuthGET<PostsListResponse>(url, token);
  }

  return bGET<PostsListResponse>(url);
};

export const getPostById = async (id: string, token?: string): Promise<Post> => {
  const url = `/v1/posts/${id}`;

  if (token) {
    return bAuthGET<Post>(url, token);
  }

  return bGET<Post>(url);
};

export const createPost = async (data: CreatePostRequest, token: string): Promise<Post> => {
  return bAuthPOST<CreatePostRequest, Post>('/v1/posts', data, token);
};

export const updatePost = async (
  id: string,
  data: UpdatePostRequest,
  token: string
): Promise<Post> => {
  return bAuthPATCH<UpdatePostRequest, Post>(`/v1/posts/${id}`, data, token);
};

export const deletePost = async (id: string, token: string): Promise<void> => {
  await bAuthDELETE(`/v1/posts/${id}`, token);
};
