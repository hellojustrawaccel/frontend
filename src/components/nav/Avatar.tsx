import Image from 'next/image';
import { cn } from '@/utils/cn';

type AvatarProps = {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeMap = {
  sm: 'size-6 text-[10px]',
  md: 'size-8 text-xs',
  lg: 'size-10 text-sm',
};

export const Avatar = ({ src, name, size = 'sm', className }: AvatarProps) => {
  const fallback = name?.slice(0, 1).toUpperCase() ?? '?';

  return (
    <div
      className={cn(
        'bg-primary/10 text-primary relative flex items-center justify-center overflow-hidden rounded-full font-medium',
        sizeMap[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" unoptimized />
      ) : (
        fallback
      )}
    </div>
  );
};
