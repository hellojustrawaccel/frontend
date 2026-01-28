import { api } from '@/lib/api';
import { LinkType } from '@/constants/enums.constant';
import { ClientLink, ServerLink } from '@/types';

export const getLinks = async (type: LinkType): Promise<ClientLink<typeof type>[]> => {
  const data = await api.get<ServerLink[]>(`/v1/links?type=${type}`);

  return data.map(({ title, description, url, color, order }) =>
    type === LinkType.Home
      ? {
          title,
          url,
          order,
        }
      : {
          title,
          url,
          order,
          description,
          color,
        }
  );
};

export const getLinkById = async (id: string) => {
  return api.get<ServerLink>(`/v1/links/${id}`);
};

export const createLink = async (
  link: Omit<ServerLink, 'id' | 'createdAt' | 'updatedAt'>,
  token: string
) => {
  return api.post<ServerLink, Omit<ServerLink, 'id' | 'createdAt' | 'updatedAt'>>(
    '/v1/links',
    link,
    token
  );
};

export const updateLink = async (
  id: string,
  link: Partial<Omit<ServerLink, 'id' | 'createdAt' | 'updatedAt'>>,
  token: string
) => {
  return api.patch<ServerLink, Partial<Omit<ServerLink, 'id' | 'createdAt' | 'updatedAt'>>>(
    `/v1/links/${id}`,
    link,
    token
  );
};

export const deleteLink = async (id: string, token: string) => {
  return api.delete<void>(`/v1/links/${id}`, token);
};
