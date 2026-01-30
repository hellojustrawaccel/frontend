'use client';

import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import RequireAdmin from '@/components/guards/RequireAdmin';
import AdminTabs from '@/components/admin/AdminTabs';

const AdminPage = () => {
  return (
    <RequireAdmin>
      <PageWrapper>
        <PageContent>
          <div className="w-full">
            <h1 className="mb-2">admin panel</h1>
            <AdminTabs />
          </div>
        </PageContent>
      </PageWrapper>
    </RequireAdmin>
  );
};

export default AdminPage;
