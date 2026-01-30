import { cn } from '@/lib/cn';

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-md bg-neutral-800/60', className)} />
);

export default Skeleton;
