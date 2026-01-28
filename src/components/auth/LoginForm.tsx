'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  identifier: z.string().min(1, 'username or email is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (identifier: string) => Promise<void>;
  error: string | null;
  loading: boolean;
}

const LoginForm = ({ onSubmit, error, loading }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    await onSubmit(data.identifier);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="identifier" className="text-secondary text-xs">
          username or email
        </label>
        <input
          id="identifier"
          type="text"
          placeholder="johndoe or john@example.com"
          disabled={loading}
          autoComplete="username"
          className="border-secondary/20 text-primary placeholder:text-tertiary focus:border-secondary rounded border px-3 py-2 text-xs transition-colors outline-none disabled:opacity-50"
          {...register('identifier')}
        />
        {errors.identifier && (
          <p className="text-tertiary text-xs">{errors.identifier.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="border-secondary/20 text-primary hover:border-secondary rounded border px-3 py-2 text-xs transition-colors disabled:opacity-50"
      >
        {loading ? 'sending code' : 'send login code'}
        {loading && '...'}
      </button>

      {error && <p className="text-tertiary text-xs">{error}</p>}
    </form>
  );
};

export default LoginForm;
