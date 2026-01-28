'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';

import PageContent from '@/components/PageContent';
import PageWrapper from '@/components/PageWrapper';
import PostsList from '@/components/blog/PostsList';
import CreatePostForm from '@/components/blog/CreatePostForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { getPosts, createPost, deletePost } from '@/services/posts';
import { toggleLike, getLikeStatus } from '@/services/likes';
import type { Post } from '@/types/post';
import { cn } from '@/utils/cn';

const BlogPage = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');

  const isAdmin = user?.role === 'admin';

  const loadPosts = useCallback(
    async (pageNum: number = 1, append: boolean = false) => {
      try {
        setIsLoading(true);
        const response = await getPosts(pageNum, 10, undefined, token);

        if (append) {
          setPosts((prev) => [...prev, ...response.posts]);
        } else {
          setPosts(response.posts);
        }

        setHasMore(response.page < response.totalPages);
        setPage(pageNum);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  const loadLikedPosts = useCallback(async () => {
    if (!token || posts.length === 0) return;

    try {
      const likedSet = new Set<string>();

      await Promise.all(
        posts.map(async (post) => {
          try {
            const status = await getLikeStatus(post.id, token);
            if (status.isLiked) {
              likedSet.add(post.id);
            }
          } catch {}
        })
      );

      setLikedPosts(likedSet);
    } catch {}
  }, [token, posts]);

  useEffect(() => {
    loadPosts(1, false);
  }, [loadPosts]);

  useEffect(() => {
    if (token && posts.length > 0) {
      loadLikedPosts();
    }
  }, [token, posts.length]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadPosts(page + 1, true);
    }
  };

  const handleCreatePost = async (data: {
    title: string;
    content: string;
    excerpt?: string;
    published: boolean;
  }) => {
    if (!token) return;

    setIsCreating(true);
    try {
      const newPost = await createPost(data, token);
      setPosts((prev) => [newPost, ...prev]);
      setShowCreateForm(false);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to create post');
    } finally {
      setIsCreating(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!token) {
      setError('Please sign in to like posts');
      return;
    }

    try {
      const response = await toggleLike(postId, token);

      // Update liked posts set
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        if (response.isLiked) {
          newSet.add(postId);
        } else {
          newSet.delete(postId);
        }
        return newSet;
      });

      // Update post likes count
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likesCount: response.likesCount } : post
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to like post');
    }
  };

  const handleComment = (postId: string) => {
    // TODO: Implement comments modal/drawer
    console.log('Comment on post:', postId);
  };

  const handleDelete = async (postId: string) => {
    if (!token) return;

    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(postId, token);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    }
  };

  const handleEdit = (postId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit post:', postId);
  };

  return (
    <PageWrapper>
      <PageContent>
        <div className="flex h-full flex-col gap-6 text-sm">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="mb-2">me and everything</p>
              </div>

              {isAdmin && (
                <button
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className={cn(
                    'text-tertiary hover:text-primary flex items-center gap-1.5 text-xs transition-colors',
                    showCreateForm && 'text-primary'
                  )}
                >
                  <Plus className="size-4" />
                  New Post
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {showCreateForm && isAdmin && (
                <div className="mb-4">
                  <CreatePostForm
                    onSubmit={handleCreatePost}
                    onCancel={() => setShowCreateForm(false)}
                    isSubmitting={isCreating}
                  />
                </div>
              )}
            </AnimatePresence>

            {isLoading && posts.length === 0 ? (
              <div className="flex w-full items-center justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : (
              <PostsList
                posts={posts}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                onLike={token ? handleLike : undefined}
                onComment={token ? handleComment : undefined}
                onDelete={isAdmin ? handleDelete : undefined}
                onEdit={isAdmin ? handleEdit : undefined}
                likedPosts={likedPosts}
                currentUserId={user?.id}
                isAdmin={isAdmin}
                emptyMessage="No posts yet. Check back later!"
              />
            )}
          </motion.div>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default BlogPage;
