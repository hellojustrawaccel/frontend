'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const verifyLoginSchema = z.object({
  code: z.string().length(5, 'login code must be exactly 5 characters').toUpperCase(),
});

type VerifyLoginFormData = z.infer<typeof verifyLoginSchema>;

interface VerifyLoginFormProps {
  email: string;
  onSubmit: (code: string) => Promise<void>;
  onBack?: () => void;
  error: string | null;
  loading: boolean;
  devCode?: string;
}

const VerifyLoginForm = ({
  email,
  onSubmit,
  onBack,
  error,
  loading,
  devCode,
}: VerifyLoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyLoginFormData>({
    resolver: zodResolver(verifyLoginSchema),
  });

  const handleFormSubmit = async (data: VerifyLoginFormData) => {
    await onSubmit(data.code.toUpperCase());
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-secondary/20 rounded border p-3">
        <p className="text-secondary text-xs">
          we sent a login code to <span className="text-primary">{email}</span>
        </p>
      </div>

      {devCode && (
        <div className="border-secondary/20 rounded border p-3">
          <p className="text-secondary font-mono text-xs">
            dev code: <span className="text-primary text-sm">{devCode}</span>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="code" className="text-secondary text-xs">
            login code
          </label>
          <input
            id="code"
            type="text"
            placeholder="X9P2M"
            disabled={loading}
            autoComplete="off"
            maxLength={5}
            className="border-secondary/20 text-primary placeholder:text-tertiary focus:border-secondary rounded border px-3 py-2 text-center font-mono text-sm tracking-widest uppercase transition-colors outline-none disabled:opacity-50"
            {...register('code')}
          />
          {errors.code && <p className="text-tertiary text-xs">{errors.code.message}</p>}
          <p className="text-tertiary text-xs">expires in 5 minutes</p>
        </div>

        {error && <p className="text-tertiary text-xs">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="border-secondary/20 text-primary hover:border-secondary flex-1 rounded border px-3 py-2 text-xs transition-colors disabled:opacity-50"
          >
            {loading ? 'logging in' : 'login'}
            {loading && '...'}
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              disabled={loading}
              className="border-secondary/20 text-secondary hover:border-secondary rounded border px-3 py-2 text-xs transition-colors disabled:opacity-50"
            >
              «
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerifyLoginForm;
