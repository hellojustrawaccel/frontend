import { UUID } from './base';

export type UserRole = 'user' | 'admin';

type ServerUser = {
  id: UUID;
  username: string;
  isAdmin: boolean;
  email: string;
  emailVerified: boolean;
  active: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  image?: string | null;
  provider: 'passwordless' | 'google' | 'github' | 'discord' | 'gitlab';
  providerId?: string | null;
  emailVerified: boolean;
  verified?: boolean; // For users list response
  active: boolean;
  role: UserRole;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  oauthAccounts?: {
    provider: string;
    providerId: string;
  }[];
};

export type BackendAuthResponse = {
  access_token: string;
  user: User;
};

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
  identifier: string; // username або email
};

export type LoginResponse = {
  message: string;
  email: string;
  code?: string;
};

export type VerifyLoginRequest = {
  identifier: string; // username або email
  code: string;
};

export type OAuthRequest = {
  provider: 'google' | 'github' | 'discord' | 'gitlab';
  providerId: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

export type ActivateUserRequest = {
  username: string;
};

export type ActivateUserResponse = {
  message: string;
  user: User;
};

export type UsersListResponse = {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
