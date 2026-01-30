import Link from 'next/link';
import { cn } from '@/lib/cn';

type AuthButtonsProps = {
  variant?: 'horizontal' | 'vertical';
  className?: string;
  isLoading?: boolean;
};

const AuthButtons = ({ variant = 'horizontal', className, isLoading }: AuthButtonsProps) => {
  if (isLoading) {
    if (variant === 'vertical') {
      return (
        <div className={cn('flex items-center justify-center p-2', className)}>
          <div className="flex gap-1">
            <div className="bg-tertiary/40 h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:0ms]" />
            <div className="bg-tertiary/40 h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:150ms]" />
            <div className="bg-tertiary/40 h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:300ms]" />
          </div>
        </div>
      );
    }

    return (
      <div className={cn('flex items-center gap-1', className)}>
        <div className="flex gap-1">
          <div className="bg-tertiary/40 h-1 w-1 animate-pulse rounded-full [animation-delay:0ms]" />
          <div className="bg-tertiary/40 h-1 w-1 animate-pulse rounded-full [animation-delay:150ms]" />
          <div className="bg-tertiary/40 h-1 w-1 animate-pulse rounded-full [animation-delay:300ms]" />
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <Link
          href="/login"
          className="hover:text-secondary text-tertiary text-center transition-all duration-150"
        >
          login
        </Link>
        <Link
          href="/register"
          className="hover:text-secondary text-tertiary text-center transition-all duration-150"
        >
          register
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Link
        href="/login"
        className="hover:text-secondary text-tertiary transition-all duration-150"
      >
        login
      </Link>
      <span className="text-tertiary">/</span>
      <Link
        href="/register"
        className="hover:text-secondary text-tertiary transition-all duration-150"
      >
        register
      </Link>
    </div>
  );
};

export default AuthButtons;
