import Skeleton from '@/components/common/Skeleton';

const ExperienceSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-3">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-40" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

export default ExperienceSkeleton;
