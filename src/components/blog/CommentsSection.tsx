'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';

import CommentCard from './CommentCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Comment } from '@/types/post';
import { cn } from '@/utils/cn';

interface CommentsSectionProps {
  postId: string;
  comments: Comment[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onCreateComment?: (content: string) => Promise<void>;
  onDeleteComment?: (commentId: string) => void;
  onEditComment?: (commentId: string, content: string) => void;
  currentUserId?: string;
  isAdmin?: boolean;
  isAuthenticated?: boolean;
}

const CommentsSection = ({
  postId,
  comments,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  onCreateComment,
  onDeleteComment,
  onEditComment,
  currentUserId,
  isAdmin = false,
  isAuthenticated = false,
}: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    if (!onCreateComment) return;

    setIsSubmitting(true);
    setError('');

    try {
      await onCreateComment(newComment.trim());
      setNewComment('');
    } catch (err: any) {
      setError(err.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageCircle className="text-tertiary size-4" />
        <h3 className="text-primary text-sm font-medium">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h3>
      </div>

      {/* Create Comment Form */}
      {isAuthenticated && onCreateComment && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded border border-red-500/20 bg-red-500/10 px-3 py-2"
            >
              <p className="text-sm text-red-500">{error}</p>
            </motion.div>
          )}

          <div className="flex gap-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              disabled={isSubmitting}
              rows={3}
              className={cn(
                'border-tertiary/20 bg-tertiary/5 text-primary placeholder:text-tertiary/50 flex-1 rounded-md border px-3 py-2 text-sm transition-colors',
                'focus:border-tertiary/40 focus:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'resize-y'
              )}
              maxLength={1000}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-tertiary text-xs">{newComment.length}/1000</span>

            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className={cn(
                'bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Post
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {!isAuthenticated && (
        <div className="border-tertiary/10 rounded-lg border bg-transparent p-4">
          <p className="text-tertiary text-center text-sm">
            Please sign in to leave a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      {isLoading && comments.length === 0 ? (
        <div className="flex w-full items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : comments.length === 0 ? (
        <div className="border-tertiary/10 rounded-lg border bg-transparent p-8">
          <p className="text-tertiary text-center text-sm">
            No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onDelete={onDeleteComment}
                onEdit={onEditComment}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
              />
            ))}
          </AnimatePresence>

          {isLoading && comments.length > 0 && (
            <div className="flex w-full items-center justify-center py-4">
              <LoadingSpinner />
            </div>
          )}

          {hasMore && !isLoading && onLoadMore && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-tertiary hover:text-primary mx-auto py-2 text-sm transition-colors"
              onClick={onLoadMore}
            >
              Load more comments
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
