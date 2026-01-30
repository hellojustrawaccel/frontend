import { ExperienceType, LinkType } from '@/constants/enums.constant';
import { UUID } from './base';

// #region Links

export type ServerLink = {
  id: UUID;
  title: string;
  type: string | LinkType;
  url: string;
  description: string | null;
  color: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ClientLink = Omit<ServerLink, 'id' | 'createdAt' | 'updatedAt'>;

export type BackendLink = ServerLink;
export type Link = ClientLink;

export type CreateLinkRequest = {
  title: string;
  type: LinkType | '';
  url: string;
  description?: string | null;
  color?: string | null;
  order: number;
};

export type UpdateLinkRequest = Partial<CreateLinkRequest>;

// #endregion

// #region Experience

export type ServerExperience = {
  id: UUID;
  company: string;
  role: string;
  type: string | ExperienceType;
  url: string;
  color: string;
  startDate: string;
  endDate: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ClientExperience = Omit<ServerExperience, 'createdAt' | 'updatedAt'>;

export type BackendExperience = ServerExperience;
export type Experience = ClientExperience;

export type CreateExperienceRequest = {
  company: string;
  role: string;
  type: ExperienceType | '';
  url: string;
  color: string;
  startDate: string;
  endDate?: string | null;
  order: number;
};

export type UpdateExperienceRequest = Partial<CreateExperienceRequest>;

// #endregion

// #region User & Auth

export type ServerUser = {
  id: UUID;
  username: string;
  email: string;
  image: string | null;
  emailVerified: boolean;
  active: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OAuthAccount = {
  provider: string;
  providerId: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  image?: string | null;
  provider?: 'passwordless' | 'google' | 'github' | 'discord' | 'gitlab';
  providerId?: string | null;
  emailVerified: boolean;
  verified?: boolean;
  active: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  oauthAccounts?: OAuthAccount[];
};

export type UserRole = 'user' | 'admin';

export type RegisterRequest = {
  username: string;
  email: string;
};

export type RegisterResponse = {
  message: string;
  email: string;
  code?: string;
};

export type VerifyEmailRequest = {
  email: string;
  code: string;
};

export type VerifyEmailResponse = {
  message: string;
};

export type LoginRequest = {
  identifier?: string;
  email?: string;
  username?: string;
};

export type LoginResponse = {
  message: string;
  identifier: string;
  email?: string;
  code?: string;
};

export type VerifyLoginRequest = {
  identifier: string;
  code: string;
};

export type OAuthRequest = {
  provider: string;
  providerId: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

export type BackendAuthResponse = {
  token?: string;
  access_token: string;
  user: User;
};

export type UsersListResponse = {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ActivateUserResponse = {
  message: string;
  user: User;
};

// #endregion
