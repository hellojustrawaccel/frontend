'use client';

import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import RequireAuth from '@/components/guards/RequireAuth';
import { useAuth } from '@/hooks/useAuth';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <RequireAuth>
      <PageWrapper>
        <PageContent>
          <div className="text-primary flex w-full flex-col gap-4 text-sm">
            <p className="text-tertiary text-xs">mock area for authenticated users</p>
            <div className="border-tertiary/20 rounded-md border p-4">
              <p className="text-tertiary text-xs">username: {user?.username}</p>
              <p className="text-tertiary text-xs">email: {user?.email}</p>
              {user?.provider && (
                <p className="text-tertiary text-xs">provider: {user?.provider}</p>
              )}
              <p className="text-tertiary text-xs">role: {user?.role}</p>
            </div>
          </div>
        </PageContent>
      </PageWrapper>
    </RequireAuth>
  );
};

export default ProfilePage;
