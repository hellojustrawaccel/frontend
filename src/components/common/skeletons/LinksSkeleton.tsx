import Skeleton from '@/components/common/Skeleton';

const LinksSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
);

export default LinksSkeleton;
