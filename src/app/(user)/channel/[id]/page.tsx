'use client';

import { motion } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Heart, MessageCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import CommentsSection from '@/components/blog/CommentsSection';
import PostSkeleton from '@/components/common/skeletons/PostSkeleton';
import BackLink from '@/components/common/BackLink';
import { useAuth } from '@/hooks/useAuth';
import { getPostById, deletePost } from '@/lib/queries/posts';
import { toggleLike, getLikeStatus } from '@/lib/queries/likes';
import {
  getCommentsByPost,
  createComment,
  deleteComment,
  updateComment,
} from '@/lib/queries/comments';
import type { Post, Comment } from '@/types/post';
import { cn } from '@/lib/cn';

const PostDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsPage, setCommentsPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  const isAdmin = user?.isAdmin;

  const loadPost = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getPostById(postId, token);
      setPost(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load post');
    } finally {
      setIsLoading(false);
    }
  }, [postId, token]);

  const loadComments = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        setIsLoadingComments(true);
        const response = await getCommentsByPost(postId, page, 20, token);

        if (append) {
          setComments((prev) => [...prev, ...response.comments]);
        } else {
          setComments(response.comments);
        }

        setHasMoreComments(response.page < response.totalPages);
        setCommentsPage(page);
      } catch (err: any) {
        console.error('Failed to load comments:', err);
      } finally {
        setIsLoadingComments(false);
      }
    },
    [postId, token]
  );

  const loadLikeStatus = useCallback(async () => {
    if (!token) return;

    try {
      const status = await getLikeStatus(postId, token);
      setIsLiked(status.isLiked);
    } catch (err) {
      console.error('Failed to load like status:', err);
    }
  }, [postId, token]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  useEffect(() => {
    loadComments(1, false);
  }, [loadComments]);

  useEffect(() => {
    if (token) {
      loadLikeStatus();
    }
  }, [token, loadLikeStatus]);

  const handleLike = async () => {
    if (!token) {
      setError('Please sign in to like posts');
      return;
    }

    try {
      const response = await toggleLike(postId, token);
      setIsLiked(response.isLiked);

      if (post) {
        setPost({ ...post, likesCount: response.likesCount });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to like post');
    }
  };

  const handleCreateComment = async (content: string) => {
    if (!token) {
      throw new Error('Please sign in to comment');
    }

    try {
      const newComment = await createComment({ content, postId }, token);
      setComments((prev) => [newComment, ...prev]);

      if (post) {
        setPost({ ...post, commentsCount: (post.commentsCount || 0) + 1 });
      }
    } catch (err: any) {
      throw new Error(err.message || 'Failed to post comment');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!token) return;

    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(commentId, token);
      setComments((prev) => prev.filter((c) => c.id !== commentId));

      if (post) {
        setPost({ ...post, commentsCount: Math.max((post.commentsCount || 0) - 1, 0) });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete comment');
    }
  };

  const handleEditComment = async (commentId: string, content: string) => {
    if (!token) return;

    try {
      const updated = await updateComment(commentId, { content }, token);
      setComments((prev) => prev.map((c) => (c.id === commentId ? updated : c)));
    } catch (err: any) {
      setError(err.message || 'Failed to update comment');
    }
  };

  const handleLoadMoreComments = () => {
    if (!isLoadingComments && hasMoreComments) {
      loadComments(commentsPage + 1, true);
    }
  };

  const handleDeletePost = async () => {
    if (!token || !isAdmin) return;

    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(postId, token);
      router.push('/blog');
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <PageContent>
          <div className="flex h-full w-full flex-col gap-6">
            <PostSkeleton />
          </div>
        </PageContent>
      </PageWrapper>
    );
  }

  if (error && !post) {
    return (
      <PageWrapper>
        <PageContent>
          <div className="flex h-full flex-col gap-4">
            <BackLink href="/blog" text="Back to Blog" />
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-tertiary text-sm">{error}</p>
            </div>
          </div>
        </PageContent>
      </PageWrapper>
    );
  }

  if (!post) {
    return (
      <PageWrapper>
        <PageContent>
          <div className="flex h-full flex-col gap-4">
            <BackLink href="/blog" text="Back to Blog" />
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <p className="text-tertiary text-sm">Post not found</p>
            </div>
          </div>
        </PageContent>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageContent>
        <div className="flex h-full flex-col gap-6 text-sm">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
          >
            <BackLink href="/blog" text="Back to Blog" />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded border border-red-500/20 bg-red-500/10 px-3 py-2"
              >
                <p className="text-sm text-red-500">{error}</p>
              </motion.div>
            )}

            <article className="border-tertiary/10 flex flex-col gap-6 rounded-lg border bg-transparent p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {post.author?.image && !imageError ? (
                      <Image
                        src={post.author.image}
                        alt={post.author.username}
                        width={48}
                        height={48}
                        className="size-12 rounded-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="bg-tertiary/10 flex size-12 items-center justify-center rounded-full">
                        <span className="text-primary text-base font-medium">
                          {post.author?.username?.[0]?.toUpperCase() || 'A'}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-primary text-base font-medium">
                        {post.author?.username || 'Admin'}
                      </span>
                      <div className="text-tertiary flex items-center gap-1.5 text-xs">
                        <Calendar className="size-3" />
                        <time dateTime={post.createdAt}>
                          {format(new Date(post.createdAt), 'PPP', { locale: ru })}
                        </time>
                      </div>
                    </div>
                  </div>

                  {!post.published && (
                    <span className="border-tertiary/20 bg-tertiary/5 text-tertiary rounded border px-2 py-1 text-xs">
                      Draft
                    </span>
                  )}
                </div>

                <h1 className="text-primary text-2xl font-bold">{post.title}</h1>

                {post.excerpt && <p className="text-secondary text-base">{post.excerpt}</p>}
              </div>

              <div className="text-secondary prose prose-sm max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>

              <div className="border-tertiary/10 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={handleLike}
                    disabled={!token}
                    className={cn(
                      'flex items-center gap-2 transition-colors',
                      isLiked ? 'text-red-500' : 'text-tertiary hover:text-red-500',
                      !token && 'cursor-default'
                    )}
                    aria-label={isLiked ? 'Unlike post' : 'Like post'}
                  >
                    <Heart className={cn('size-5', isLiked && 'fill-current')} />
                    {post.likesCount !== undefined && post.likesCount > 0 && (
                      <span className="text-sm">{post.likesCount}</span>
                    )}
                  </button>

                  <div className="text-tertiary flex items-center gap-2">
                    <MessageCircle className="size-5" />
                    {post.commentsCount !== undefined && post.commentsCount > 0 && (
                      <span className="text-sm">{post.commentsCount}</span>
                    )}
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={handleDeletePost}
                    className="text-tertiary text-sm transition-colors hover:text-red-500"
                  >
                    Delete Post
                  </button>
                )}
              </div>
            </article>

            <CommentsSection
              postId={postId}
              comments={comments}
              isLoading={isLoadingComments}
              hasMore={hasMoreComments}
              onLoadMore={handleLoadMoreComments}
              onCreateComment={token ? handleCreateComment : undefined}
              onDeleteComment={token ? handleDeleteComment : undefined}
              onEditComment={token ? handleEditComment : undefined}
              currentUserId={user?.id}
              isAdmin={isAdmin}
              isAuthenticated={!!token}
            />
          </motion.div>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default PostDetailPage;
