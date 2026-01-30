'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

import PostCard from './PostCard';
import { PostSkeleton } from '@/components/common/skeletons';
import type { Post } from '@/types/post';
import { cn } from '@/lib/cn';

interface PostsListProps {
  posts: Post[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  likedPosts?: Set<string>;
  currentUserId?: string;
  isAdmin?: boolean;
  emptyMessage?: string;
}

const PostsList = ({
  posts,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  onLike,
  onComment,
  onDelete,
  onEdit,
  likedPosts = new Set(),
  currentUserId,
  isAdmin = false,
  emptyMessage = 'No posts yet',
}: PostsListProps) => {
  const [shouldLoadMore, setShouldLoadMore] = useState(false);

  useEffect(() => {
    if (!shouldLoadMore || !onLoadMore || isLoading) return;

    onLoadMore();
    setShouldLoadMore(false);
  }, [shouldLoadMore, onLoadMore, isLoading]);

  useEffect(() => {
    if (!hasMore || !onLoadMore) return;

    const handleScroll = () => {
      if (isLoading) return;

      const scrollableElement = document.documentElement;
      const scrollTop = scrollableElement.scrollTop;
      const scrollHeight = scrollableElement.scrollHeight;
      const clientHeight = scrollableElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 300) {
        setShouldLoadMore(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, onLoadMore, isLoading]);

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-12">
        <p className="text-tertiary text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <AnimatePresence mode="popLayout">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={onLike}
            onComment={onComment}
            onDelete={onDelete}
            onEdit={onEdit}
            isLiked={likedPosts.has(post.id)}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
          />
        ))}
      </AnimatePresence>

      {isLoading && posts.length > 0 && (
        <div className="flex w-full flex-col gap-4">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {hasMore && !isLoading && onLoadMore && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-tertiary hover:text-primary mx-auto py-4 text-sm transition-colors"
          onClick={onLoadMore}
        >
          Load more
        </motion.button>
      )}
    </div>
  );
};

export default PostsList;
