import Skeleton from '@/components/common/Skeleton';

const CommentSkeleton = () => (
  <div className="border-tertiary/10 flex flex-col gap-3 rounded-lg border bg-transparent p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  </div>
);

export default CommentSkeleton;
