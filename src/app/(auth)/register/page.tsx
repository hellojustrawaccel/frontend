'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import OAuthProviders from '@/components/auth/OAuthProviders';
import RegisterForm from '@/components/auth/RegisterForm';
import VerifyEmailForm from '@/components/auth/VerifyEmailForm';
import PageContent from '@/components/PageContent';
import PageWrapper from '@/components/PageWrapper';
import { register as registerUser, verifyEmail } from '@/services/auth';
import { signIn } from 'next-auth/react';

type RegisterStep = 'register' | 'verify' | 'pending';

export default function RegisterPage() {
  const [step, setStep] = useState<RegisterStep>('register');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [devCode, setDevCode] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOAuthSelect = async (provider: string) => {
    setLoading(true);
    setError(null);

    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (err) {
      setError('oauth registration failed');
      setLoading(false);
    }
  };

  const handleRegister = async (data: { username: string; email: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(data);

      setEmail(data.email);
      setUsername(data.username);
      setDevCode(response.code);
      setStep('verify');
    } catch (err: any) {
      const errorMessage = err.message || 'registration failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      await verifyEmail({ email, code });

      // Email verified successfully, show pending activation screen
      setStep('pending');
    } catch (err: any) {
      const errorMessage = err.message || 'verification failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser({ username, email });

      setDevCode(response.code);
      setError('code resent!');
    } catch (err: any) {
      const errorMessage = err.message || 'failed to resend code';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <PageContent>
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
              {step === 'register' && 'nice to meet you'}
              {step === 'verify' && 'verify your email'}
              {step === 'pending' && 'almost there'}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <OAuthProviders onSelect={handleOAuthSelect} disabled={loading} />
                <RegisterForm onSubmit={handleRegister} error={error} loading={loading} />
                <p className="text-secondary text-xs">
                  already have an account?{' '}
                  <Link href="/login" className="text-primary hover:underline">
                    sign in
                  </Link>
                </p>
              </motion.div>
            )}

            {step === 'verify' && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <VerifyEmailForm
                  email={email}
                  onSubmit={handleVerifyEmail}
                  onResend={handleResendCode}
                  error={error}
                  loading={loading}
                  devCode={devCode}
                />
                <div className="border-secondary/20 border-t pt-4">
                  <p className="text-secondary text-xs">
                    wrong email?{' '}
                    <button
                      onClick={() => {
                        setStep('register');
                        setError(null);
                      }}
                      className="text-primary hover:underline"
                    >
                      start over
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4"
              >
                <div className="bg-light border-secondary/20 rounded border p-4">
                  <p className="text-primary mb-2 text-xs font-medium">✓ email verified</p>
                  <p className="text-secondary mb-3 text-xs">
                    your account is pending activation by an administrator
                  </p>
                  <div className="text-secondary space-y-1 text-xs">
                    <p>⏱ typically takes 1-3 days</p>
                    <p className="text-tertiary">
                      you&apos;ll receive an email once your account is activated
                    </p>
                  </div>
                </div>

                <Link href="/login" className="text-primary text-xs hover:underline">
                  ← back to login
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </PageContent>
    </PageWrapper>
  );
}
