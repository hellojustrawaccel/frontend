'use client';

import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Trash2, Edit2 } from 'lucide-react';

import type { Post } from '@/types/post';
import { cn } from '@/utils/cn';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onEdit?: (postId: string) => void;
  isLiked?: boolean;
  currentUserId?: string;
  isAdmin?: boolean;
}

const PostCard = ({
  post,
  onLike,
  onComment,
  onDelete,
  onEdit,
  isLiked = false,
  currentUserId,
  isAdmin = false,
}: PostCardProps) => {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ru,
  });

  const canManage = isAdmin || currentUserId === post.authorId;

  const handleCardClick = () => {
    router.push(`/blog/${post.id}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
      onClick={handleCardClick}
      className="border-tertiary/10 hover:border-tertiary/20 group relative cursor-pointer rounded-lg border bg-transparent p-4 transition-colors"
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {post.author?.image && !imageError ? (
            <img
              src={post.author.image}
              alt={post.author.username}
              className="size-10 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="bg-tertiary/10 flex size-10 items-center justify-center rounded-full">
              <span className="text-primary text-sm font-medium">
                {post.author?.username?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-primary text-sm font-medium">
              {post.author?.username || 'Admin'}
            </span>
            <span className="text-tertiary text-xs">{timeAgo}</span>
          </div>
        </div>

        {canManage && (
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {onEdit && (
              <button
                onClick={(e) => handleActionClick(e, () => onEdit(post.id))}
                className="text-tertiary hover:text-primary transition-colors"
                aria-label="Edit post"
              >
                <Edit2 className="size-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => handleActionClick(e, () => onDelete(post.id))}
                className="text-tertiary transition-colors hover:text-red-500"
                aria-label="Delete post"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-primary mb-2 text-base font-medium">{post.title}</h3>
        {post.excerpt && <p className="text-secondary mb-2 text-sm">{post.excerpt}</p>}
        <div className="text-tertiary prose prose-sm max-w-none text-sm">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button
          onClick={(e) => onLike && handleActionClick(e, () => onLike(post.id))}
          disabled={!onLike}
          className={cn(
            'flex items-center gap-1.5 transition-colors',
            isLiked ? 'text-red-500' : 'text-tertiary hover:text-red-500',
            !onLike && 'cursor-default'
          )}
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
        >
          <Heart className={cn('size-4', isLiked && 'fill-current')} />
          {post.likesCount !== undefined && post.likesCount > 0 && (
            <span className="text-xs">{post.likesCount}</span>
          )}
        </button>

        <button
          onClick={(e) => onComment && handleActionClick(e, () => onComment(post.id))}
          disabled={!onComment}
          className={cn(
            'text-tertiary hover:text-primary flex items-center gap-1.5 transition-colors',
            !onComment && 'cursor-default'
          )}
          aria-label="Comment on post"
        >
          <MessageCircle className="size-4" />
          {post.commentsCount !== undefined && post.commentsCount > 0 && (
            <span className="text-xs">{post.commentsCount}</span>
          )}
        </button>
      </div>

      {!post.published && (
        <div className="bg-tertiary/5 border-tertiary/20 mt-3 rounded border px-2 py-1">
          <span className="text-tertiary text-xs">Draft</span>
        </div>
      )}
    </motion.article>
  );
};

export default PostCard;
