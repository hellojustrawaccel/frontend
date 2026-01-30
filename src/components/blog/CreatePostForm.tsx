'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { X } from 'lucide-react';

import FormInput from '@/components/common/FormInput';
import { cn } from '@/lib/cn';

interface CreatePostFormProps {
  onSubmit: (data: {
    title: string;
    content: string;
    excerpt?: string;
    published: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const CreatePostForm = ({ onSubmit, onCancel, isSubmitting = false }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [published, setPublished] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || undefined,
        published,
      });

      setTitle('');
      setContent('');
      setExcerpt('');
      setPublished(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
      className="border-tertiary/10 w-full rounded-lg border bg-transparent p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-primary text-base font-medium">Create New Post</h3>
        <button
          onClick={onCancel}
          className="text-tertiary hover:text-primary transition-colors"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="rounded border border-red-500/20 bg-red-500/10 px-3 py-2">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <FormInput
          label="Title"
          type="text"
          value={title}
          onChange={setTitle}
          placeholder="Post title..."
          required
          disabled={isSubmitting}
        />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="excerpt" className="text-primary text-sm font-medium">
            Excerpt <span className="text-tertiary">(optional)</span>
          </label>
          <input
            id="excerpt"
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description..."
            disabled={isSubmitting}
            className={cn(
              'border-tertiary/20 bg-tertiary/5 text-primary placeholder:text-tertiary/50 w-full rounded-md border px-3 py-2 text-sm transition-colors',
              'focus:border-tertiary/40 focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
            maxLength={200}
          />
          {excerpt.length > 0 && (
            <span className="text-tertiary text-xs">{excerpt.length}/200</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="content" className="text-primary text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            required
            disabled={isSubmitting}
            rows={8}
            className={cn(
              'border-tertiary/20 bg-tertiary/5 text-primary placeholder:text-tertiary/50 w-full rounded-md border px-3 py-2 text-sm transition-colors',
              'focus:border-tertiary/40 focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'resize-y'
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={isSubmitting}
            className={cn(
              'border-tertiary/20 bg-tertiary/5 size-4 rounded transition-colors',
              'checked:bg-primary checked:border-primary',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
          <label htmlFor="published" className="text-primary cursor-pointer text-sm">
            Publish immediately
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            {isSubmitting ? <>Creating...</> : 'Create Post'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className={cn(
              'text-tertiary hover:text-primary px-4 py-2 text-sm transition-colors',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePostForm;
