'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import * as authService from '@/services/auth';
import type { User } from '@/types/auth';

export default function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function useAdminUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session?.backendToken) return;

      try {
        const fetchedUsers = await authService.getUsers(session.backendToken);
        setUsers(fetchedUsers);
      } catch {
        setUsers([]);
      }
    };

    void fetchUsers();
  }, [session?.backendToken]);

  const activateUser = async (username: string) => {
    if (!session?.backendToken) return;

    setLoading(true);
    try {
      await authService.activateUser({ username }, session.backendToken);
      const freshUsers = await authService.getUsers(session.backendToken);
      setUsers(freshUsers);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = async () => {
    if (!session?.backendToken) return;

    setLoading(true);
    try {
      const freshUsers = await authService.getUsers(session.backendToken);
      setUsers(freshUsers);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, activateUser, refreshUsers };
}
