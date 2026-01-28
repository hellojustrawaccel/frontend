'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated, isReady, user } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    if (user?.role !== 'admin') {
      router.replace('/');
    }
  }, [isAuthenticated, isReady, router, user?.role]);

  if (!isReady || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="text-tertiary flex w-full items-center justify-center py-16 text-sm">
        loading…
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;
