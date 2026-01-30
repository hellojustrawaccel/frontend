import { api } from '@/lib/api';
import type { BackendLink, CreateLinkRequest, UpdateLinkRequest } from '@/types';

export const getLinks = async (type?: string): Promise<BackendLink[]> => {
  const endpoint = type ? `/v1/links?type=${type}` : '/v1/links';
  return api.get<BackendLink[]>(endpoint);
};

export const getLinkById = async (id: string): Promise<BackendLink> =>
  api.get<BackendLink>(`/v1/links/${id}`);

export const createLink = async (
  data: CreateLinkRequest,
  token: string
): Promise<BackendLink> => api.post<BackendLink, CreateLinkRequest>('/v1/links', data, token);

export const updateLink = async (
  id: string,
  data: UpdateLinkRequest,
  token: string
): Promise<BackendLink> =>
  api.patch<BackendLink, UpdateLinkRequest>(`/v1/links/${id}`, data, token);

export const deleteLink = async (id: string, token: string): Promise<void> =>
  api.delete<void>(`/v1/links/${id}`, token);
