'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import PageContent from '@/components/PageContent';
import PageWrapper from '@/components/PageWrapper';
import ErrorBlock from '@/components/ErrorBlock';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');
    const next = searchParams.get('next') ?? '/';

    if (errorParam) {
      setError(errorParam);
      return;
    }

    if (token) {
      localStorage.setItem('auth_token', token);
      router.push(next);
    } else {
      setError('no authentication token received');
    }
  }, [router, searchParams]);

  return (
    <PageWrapper>
      <PageContent>
        <div className="text-primary flex w-full flex-col gap-6 text-sm">
          {error ? (
            <ErrorBlock label="authentication failed" message={error} />
          ) : (
            <LoadingSpinner text="authenticating..." />
          )}
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default AuthCallbackPage;
