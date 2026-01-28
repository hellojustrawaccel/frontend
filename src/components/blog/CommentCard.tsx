'use client';

import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

import type { Comment } from '@/types/post';
import { cn } from '@/utils/cn';

interface CommentCardProps {
  comment: Comment;
  onDelete?: (commentId: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  currentUserId?: string;
  isAdmin?: boolean;
}

const CommentCard = ({
  comment,
  onDelete,
  onEdit,
  currentUserId,
  isAdmin = false,
}: CommentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [imageError, setImageError] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
    locale: ru,
  });

  const canManage = isAdmin || currentUserId === comment.authorId;

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit?.(comment.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: [0.26, 1, 0.6, 1] }}
      className="border-tertiary/10 group hover:border-tertiary/20 flex gap-3 rounded-lg border bg-transparent p-3 transition-colors"
    >
      {/* Avatar */}
      <div className="bg-tertiary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
        <span className="text-primary text-xs font-medium">
          {comment.author?.username?.[0]?.toUpperCase() || 'U'}
        </span>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-primary text-sm font-medium">
              {comment.author?.username || 'Anonymous'}
            </span>
            <span className="text-tertiary text-xs">{timeAgo}</span>
          </div>

          {canManage && !isEditing && (
            <div className="flex items-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
              {onEdit && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-tertiary hover:text-primary transition-colors"
                  aria-label="Edit comment"
                >
                  <Edit2 className="size-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className="text-tertiary transition-colors hover:text-red-500"
                  aria-label="Delete comment"
                >
                  <Trash2 className="size-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={cn(
                'border-tertiary/20 bg-tertiary/5 text-primary placeholder:text-tertiary/50 w-full rounded-md border px-2 py-1.5 text-sm transition-colors',
                'focus:border-tertiary/40 focus:outline-none',
                'resize-y'
              )}
              rows={3}
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveEdit}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-1 text-xs font-medium transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-tertiary hover:text-primary px-3 py-1 text-xs transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-secondary text-sm whitespace-pre-wrap">{comment.content}</p>
        )}
      </div>
    </motion.div>
  );
};

export default CommentCard;
