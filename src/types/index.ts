import { ExperienceType, LinkType } from '@/constants/enums.constant';
import { UUID } from './base';

// #region Links

export type ServerLink = {
  id: UUID;
  type: string | LinkType;
  description?: string;
  color?: string;
  title: string;
  url: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ClientLink<Type extends LinkType> = Type extends LinkType.Home
  ? Omit<ServerLink, 'id' | 'type' | 'createdAt' | 'updatedAt' | 'color' | 'description'>
  : Omit<ServerLink, 'id' | 'type' | 'createdAt' | 'updatedAt'>;

// #endregion

// #region Experience

export type ServerExperience = {
  id: UUID;
  company: string;
  role: string;
  url: string;
  type: string | ExperienceType;
  color: string;
  order: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientExperience = Omit<ServerExperience, 'createdAt' | 'updatedAt'>;

// #endregion

// #region User

export type ServerUser = {
  id: UUID;
  username: string;
  email: string;
  image?: string;
  emailVerified: boolean;
  active: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// #endregion
