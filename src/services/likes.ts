import { bAuthGET, bAuthPOST, bGET } from '@/utils/axios/http';
import type {
  LikeToggleResponse,
  LikeStatusResponse,
  LikesCountResponse,
  LikesUsersResponse,
} from '@/types/post';

export const toggleLike = async (
  postId: string,
  token: string
): Promise<LikeToggleResponse> => {
  return bAuthPOST<{}, LikeToggleResponse>(`/v1/likes/toggle/${postId}`, {}, token);
};

export const getLikeStatus = async (
  postId: string,
  token: string
): Promise<LikeStatusResponse> => {
  return bAuthGET<LikeStatusResponse>(`/v1/likes/status/${postId}`, token);
};

export const getLikesCount = async (postId: string): Promise<LikesCountResponse> => {
  return bGET<LikesCountResponse>(`/v1/likes/count/${postId}`);
};

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

  const url = `/v1/likes/users/${postId}?${params.toString()}`;

  if (token) {
    return bAuthGET<LikesUsersResponse>(url, token);
  }

  return bGET<LikesUsersResponse>(url);
};
