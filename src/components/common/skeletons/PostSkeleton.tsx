import Skeleton from '@/components/common/Skeleton';

const PostSkeleton = () => (
  <div className="border-tertiary/10 flex flex-col gap-4 rounded-lg border bg-transparent p-6">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>

    <Skeleton className="h-6 w-3/4" />

    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />

    <div className="border-tertiary/10 flex items-center gap-6 border-t pt-4">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
  </div>
);

export default PostSkeleton;
