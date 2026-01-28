import { bAuthGET, bAuthPOST, bAuthPATCH, bAuthDELETE, bGET } from '@/utils/axios/http';
import type { BackendLink, CreateLinkRequest, UpdateLinkRequest } from '@/types/links';

export const getLinks = async (type?: 'home' | 'more'): Promise<BackendLink[]> => {
  const url = type ? `/v1/links?type=${type}` : '/v1/links';
  return bGET<BackendLink[]>(url);
};

export const getLinkById = async (id: string): Promise<BackendLink> => {
  return bGET<BackendLink>(`/v1/links/${id}`);
};

export const createLink = async (
  data: CreateLinkRequest,
  token: string
): Promise<BackendLink> => {
  return bAuthPOST<CreateLinkRequest, BackendLink>('/v1/links', data, token);
};

export const updateLink = async (
  id: string,
  data: UpdateLinkRequest,
  token: string
): Promise<BackendLink> => {
  return bAuthPATCH<UpdateLinkRequest, BackendLink>(`/v1/links/${id}`, data, token);
};

export const deleteLink = async (id: string, token: string): Promise<void> => {
  await bAuthDELETE(`/v1/links/${id}`, token);
};
