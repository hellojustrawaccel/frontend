import { api } from '@/lib/api';
import type {
  BackendAuthResponse,
  LoginRequest,
  LoginResponse,
  OAuthRequest,
  RegisterRequest,
  RegisterResponse,
  UsersListResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyLoginRequest,
  ActivateUserResponse,
} from '@/types';

export const register = async (data: RegisterRequest): Promise<RegisterResponse> =>
  api.post<RegisterResponse, RegisterRequest>('/v1/auth/register', data);

export const verifyEmail = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> =>
  api.post<VerifyEmailResponse, VerifyEmailRequest>('/v1/auth/verify-email', data);

export const requestLogin = async (data: LoginRequest): Promise<LoginResponse> =>
  api.post<LoginResponse, LoginRequest>('/v1/auth/login', data);

export const verifyLogin = async (
  identifier: string,
  code: string
): Promise<BackendAuthResponse> =>
  api.post<BackendAuthResponse, VerifyLoginRequest>('/v1/auth/verify-login', {
    identifier,
    code,
  });

export const oauthLogin = async (data: OAuthRequest): Promise<BackendAuthResponse> =>
  api.post<BackendAuthResponse, OAuthRequest>('/v1/auth/oauth', data);

export const getUsers = async (
  page: number = 1,
  limit: number = 10,
  provider?: string,
  active?: boolean,
  token?: string
): Promise<UsersListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (provider) {
    params.append('provider', provider);
  }

  if (active !== undefined) {
    params.append('active', active.toString());
  }

  return api.get<UsersListResponse>(`/v1/auth/users?${params.toString()}`, token);
};

export const activateUser = async (
  userId: string,
  token: string
): Promise<ActivateUserResponse> =>
  api.post<ActivateUserResponse, { userId: string }>('/v1/auth/activate', { userId }, token);

export const deactivateUser = async (
  userId: string,
  token: string
): Promise<ActivateUserResponse> =>
  api.post<ActivateUserResponse, { userId: string }>('/v1/auth/deactivate', { userId }, token);

export const checkRegistrationHealth = async (
  token: string
): Promise<{
  totalRegistrations: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}> => {
  return api.get<{
    totalRegistrations: number;
    verifiedUsers: number;
    unverifiedUsers: number;
    activeUsers: number;
    inactiveUsers: number;
  }>('/v1/auth/registration/health', token);
};
