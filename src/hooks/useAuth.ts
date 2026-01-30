'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import type { User } from '@/types';

export const useAuth = () => {
  const { data: session, status } = useSession();

  const user = useMemo<User | null>(() => {
    if (!session?.user) return null;

    return {
      id: session.user.id,
      username: session.user.username,
      email: session.user.email,
      image: session.user.image,
      provider: session.user.provider,
      emailVerified: session.user.emailVerified ?? false,
      active: session.user.active,
      isAdmin: session.user.isAdmin,
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
