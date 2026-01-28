import {
  ActivateUserRequest,
  ActivateUserResponse,
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
} from '@/types/auth';
import { bGET, bPOST, bAuthGET, bAuthPOST } from '@/utils/axios/http';

export const register = async (data: RegisterRequest): Promise<RegisterResponse> =>
  bPOST<RegisterRequest, RegisterResponse>('/v1/auth/register', data);

export const verifyEmail = async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> =>
  bPOST<VerifyEmailRequest, VerifyEmailResponse>('/v1/auth/verify-email', data);

export const requestLogin = async (identifier: string): Promise<LoginResponse> =>
  bPOST<LoginRequest, LoginResponse>('/v1/auth/login', { identifier });

export const verifyLogin = async (
  identifier: string,
  code: string
): Promise<BackendAuthResponse> =>
  bPOST<VerifyLoginRequest, BackendAuthResponse>('/v1/auth/verify-login', {
    identifier,
    code,
  });

export const oauthLogin = async (data: OAuthRequest): Promise<BackendAuthResponse> =>
  bPOST<OAuthRequest, BackendAuthResponse>('/v1/auth/oauth', data);

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

  return bAuthGET<UsersListResponse>(`/v1/auth/users?${params.toString()}`, token);
};

export const activateUser = async (
  userId: string,
  token: string
): Promise<ActivateUserResponse> =>
  bAuthPOST<{ userId: string }, ActivateUserResponse>('/v1/auth/activate', { userId }, token);

export const deactivateUser = async (
  userId: string,
  token: string
): Promise<ActivateUserResponse> =>
  bAuthPOST<{ userId: string }, ActivateUserResponse>(
    '/v1/auth/deactivate',
    { userId },
    token
  );

export const checkRegistrationHealth = async (
  token: string
): Promise<{
  totalRegistrations: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  activeUsers: number;
  inactiveUsers: number;
}> => {
  return bAuthGET<{
    totalRegistrations: number;
    verifiedUsers: number;
    unverifiedUsers: number;
    activeUsers: number;
    inactiveUsers: number;
  }>('/v1/auth/registration/health', token);
};
