'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import LoginForm from '@/components/auth/LoginForm';
import OAuthProviders from '@/components/auth/OAuthProviders';
import VerifyLoginForm from '@/components/auth/VerifyLoginForm';
import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import LoadingSpinner from '@/components/LoadingSpinner';
import { requestLogin } from '@/lib/queries/auth';

type LoginStep = 'request' | 'verify';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<LoginStep>('request');
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [devCode, setDevCode] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleOAuthSelect = async (provider: string) => {
    setLoading(true);
    setError(null);
    try {
      await signIn(provider, { callbackUrl });
    } catch (err) {
      setError('oauth login failed');
      setLoading(false);
    }
  };

  const handleLoginRequest = async (inputIdentifier: string) => {
    setLoading(true);
    setError(null);
    setIdentifier(inputIdentifier);

    try {
      const isEmail = inputIdentifier.includes('@');
      const response = await requestLogin(
        isEmail ? { email: inputIdentifier } : { username: inputIdentifier }
      );

      setEmail(response.email || response.identifier);
      setDevCode(response.code || '');
      setStep('verify');
    } catch (err: any) {
      const errorMessage = err.message || 'failed to send login code';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginVerify = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('passwordless', {
        identifier,
        code,
        redirect: false,
      });

      if (result?.error) {
        setError('invalid or expired code');
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: any) {
      const errorMessage = err.message || 'login verification failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('request');
    setError(null);
    setDevCode(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="text-primary flex w-full max-w-md flex-col gap-6 px-4 text-sm sm:px-0"
    >
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-2"
      >
        <p className="text-secondary text-xs">
          {step === 'request' ? 'welcome back' : 'check your email'}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'request' ? (
          <motion.div
            key="request"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <LoginForm onSubmit={handleLoginRequest} error={error} loading={loading} />
            <OAuthProviders onSelect={handleOAuthSelect} disabled={loading} />
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <VerifyLoginForm
              email={email}
              onSubmit={handleLoginVerify}
              onBack={handleBack}
              error={error}
              loading={loading}
              devCode={devCode}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-secondary text-xs"
      >
        don&apos;t have an account?{' '}
        <Link href="/register" className="text-primary hover:underline">
          sign up
        </Link>
      </motion.p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <PageWrapper>
      <PageContent>
        <Suspense fallback={<LoadingSpinner text="loading..." />}>
          <LoginPageContent />
        </Suspense>
      </PageContent>
    </PageWrapper>
  );
}
