'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import ErrorBlock from '@/components/common/ErrorBlock';
import LoadingSpinner from '@/components/LoadingSpinner';

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorParam = searchParams.get('error');
  const token = searchParams.get('token');
  const next = searchParams.get('next') ?? '/';

  useEffect(() => {
    if (errorParam) {
      return;
    }

    if (token) {
      localStorage.setItem('auth_token', token);
      router.push(next);
    }
  }, [router, token, next, errorParam]);

  if (errorParam) {
    return (
      <div className="text-primary flex w-full flex-col gap-6 text-sm">
        <ErrorBlock label="authentication failed" message={errorParam} />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-primary flex w-full flex-col gap-6 text-sm">
        <ErrorBlock label="authentication failed" message="no authentication token received" />
      </div>
    );
  }

  return (
    <div className="text-primary flex w-full flex-col gap-6 text-sm">
      <LoadingSpinner text="authenticating..." />
    </div>
  );
};

const AuthCallbackPage = () => {
  return (
    <PageWrapper>
      <PageContent>
        <Suspense fallback={<LoadingSpinner text="loading..." />}>
          <AuthCallbackContent />
        </Suspense>
      </PageContent>
    </PageWrapper>
  );
};

export default AuthCallbackPage;
