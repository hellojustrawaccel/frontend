'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    if (!isReady || isAuthenticated) {
      return;
    }

    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
    router.replace(`/login${next}`);
  }, [isAuthenticated, isReady, pathname, router]);

  if (!isReady || !isAuthenticated) {
    return (
      <div className="text-tertiary flex w-full items-center justify-center py-16 text-sm">
        loading…
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
