import Skeleton from '@/components/common/Skeleton';

const LinksSkeleton = () => (
  <>
    <div className="flex flex-col gap-2">
      <h3 className="leading-none font-bold">other links</h3>
      <div className="ml-3 flex flex-col gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  </>
);

export default LinksSkeleton;
