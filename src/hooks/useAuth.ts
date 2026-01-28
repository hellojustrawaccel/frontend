'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import type { UserRole, User } from '@/types/auth';

export const useAuth = () => {
  const { data: session, status } = useSession();

  const user = useMemo<User | null>(() => {
    if (!session?.user) return null;

    return {
      id: session.user.id,
      username: session.user.username ?? session.user.email?.split('@')[0] ?? '',
      email: session.user.email ?? '',
      image: session.user.image ?? null,
      provider: (session.user.provider ?? 'google') as User['provider'],
      emailVerified: session.user.emailVerified ?? true,
      active: session.user.active ?? true,
      role: (session.user.role ?? 'user') as UserRole,
    };
  }, [session]);

  const backendToken = session?.backendToken;

  return {
    session: session ? { user, token: backendToken ?? '' } : null,
    user,
    token: backendToken,
    backendToken,
    isAuthenticated: Boolean(session?.user),
    isReady: status !== 'loading',
    status,
  };
};
