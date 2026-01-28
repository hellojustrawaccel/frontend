import { LinkType } from '@/constants/enums.constant';

export type Link = {
  title: string;
  type: string | LinkType;
  url: string;
  description: string | null;
  color: `#${string}` | null;
};

export type BackendLink = {
  id: string;
  title: string;
  type: string;
  url: string;
  description?: string | null;
  color?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateLinkRequest = {
  title: string;
  type: string;
  url: string;
  description?: string;
  color?: string;
  order?: number;
};

export type UpdateLinkRequest = {
  title?: string;
  type?: string;
  url?: string;
  description?: string;
  color?: string;
  order?: number;
};
