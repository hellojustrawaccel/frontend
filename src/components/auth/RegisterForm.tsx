'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'username must be at least 3 characters')
    .max(30, 'username must be at most 30 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'username can only contain letters, numbers, underscores, and hyphens'
    ),
  email: z.email('invalid email address'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  error: string | null;
  loading: boolean;
}

const RegisterForm = ({ onSubmit, error, loading }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-secondary text-xs">
          username
        </label>
        <input
          id="username"
          type="text"
          placeholder="zxc_spider_man_1672"
          disabled={loading}
          autoComplete="username"
          className="border-secondary/20 text-primary placeholder:text-tertiary focus:border-secondary rounded border px-3 py-2 text-xs transition-colors outline-none disabled:opacity-50"
          {...register('username')}
        />
        {errors.username && <p className="text-tertiary text-xs">{errors.username.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-secondary text-xs">
          email
        </label>
        <input
          id="email"
          type="email"
          placeholder="lenya_prikolkin@mymom.com"
          disabled={loading}
          autoComplete="email"
          className="border-secondary/20 text-primary placeholder:text-tertiary focus:border-secondary rounded border px-3 py-2 text-xs transition-colors outline-none disabled:opacity-50"
          {...register('email')}
        />
        {errors.email && <p className="text-tertiary text-xs">{errors.email.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="border-secondary/20 text-primary hover:border-secondary rounded border px-3 py-2 text-xs transition-colors disabled:opacity-50"
      >
        {loading ? 'creating account' : 'create account'}
        {loading && '...'}
      </button>

      {error && <p className="text-tertiary text-xs">{error}</p>}
    </form>
  );
};

export default RegisterForm;
