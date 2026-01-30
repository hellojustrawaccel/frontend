import { api } from '@/lib/api';
import type {
  LikeToggleResponse,
  LikeStatusResponse,
  LikesCountResponse,
  LikesUsersResponse,
} from '@/types/post';

export const toggleLike = async (postId: string, token: string): Promise<LikeToggleResponse> =>
  api.post<LikeToggleResponse, Record<string, never>>(`/v1/likes/toggle/${postId}`, {}, token);

export const getLikeStatus = async (
  postId: string,
  token: string
): Promise<LikeStatusResponse> =>
  api.get<LikeStatusResponse>(`/v1/likes/status/${postId}`, token);

export const getLikesCount = async (postId: string): Promise<LikesCountResponse> =>
  api.get<LikesCountResponse>(`/v1/likes/count/${postId}`);

export const getUsersWhoLiked = async (
  postId: string,
  page: number = 1,
  limit: number = 20,
  token?: string
): Promise<LikesUsersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return api.get<LikesUsersResponse>(`/v1/likes/users/${postId}?${params.toString()}`, token);
};
