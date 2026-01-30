'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '@/lib/queries/posts';
import type { Post, CreatePostRequest } from '@/types/post';
import Skeleton from '@/components/common/Skeleton';
import ErrorBlock from '@/components/common/ErrorBlock';

type PostsTabProps = {
  token?: string;
};

const PostsTab = ({ token }: PostsTabProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: '',
    content: '',
    published: false,
  });

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPosts(page, limit, showDrafts ? false : undefined, token);
      setPosts(response.posts);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [page, limit, showDrafts, token]);

  useEffect(() => {
    loadPosts();
  }, [page, showDrafts, token, loadPosts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingPost) {
        await updatePost(editingPost.id, formData, token);
      } else {
        await createPost(formData, token);
      }

      setFormData({ title: '', content: '', published: false });
      setEditingPost(null);
      setIsCreating(false);
      loadPosts();
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      published: post.published,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Удалить пост?')) return;

    try {
      await deletePost(id, token);
      loadPosts();
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '', published: false });
    setEditingPost(null);
    setIsCreating(false);
  };

  const totalPages = Math.ceil(total / limit);

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col gap-3 py-12">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <ErrorBlock label="Ошибка" message={error} />}

      {!isCreating && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsCreating(true)}
            className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-xs text-white transition-colors"
          >
            + Создать пост
          </button>

          <label className="text-secondary/60 flex cursor-pointer items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={showDrafts}
              onChange={(e) => {
                setShowDrafts(e.target.checked);
                setPage(1);
              }}
              className="rounded"
            />
            Показать черновики
          </label>
        </div>
      )}

      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="bg-light border-secondary/20 space-y-3 rounded border p-4"
        >
          <h3 className="text-primary text-sm font-medium">
            {editingPost ? 'Редактировать пост' : 'Новый пост'}
          </h3>

          <input
            type="text"
            placeholder="Заголовок"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={200}
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <textarea
            placeholder="Контент (поддерживается markdown)"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            maxLength={10000}
            rows={8}
            className="border-secondary/20 focus:border-secondary/40 w-full resize-none rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <label className="text-secondary/60 flex cursor-pointer items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="rounded"
            />
            Опубликовать
          </label>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-xs text-white transition-colors"
            >
              {editingPost ? 'Сохранить' : 'Создать'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-light border-secondary/20 hover:border-secondary/40 rounded border px-4 py-2 text-xs transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-light border-secondary/20 space-y-2 rounded border p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="text-primary text-sm font-medium">{post.title}</h4>
                <p className="text-secondary/60 mt-1 line-clamp-2 text-xs">{post.content}</p>
              </div>

              <div className="flex shrink-0 gap-2">
                {!post.published && (
                  <span className="rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 text-[10px] text-yellow-600">
                    Черновик
                  </span>
                )}
              </div>
            </div>

            <div className="border-secondary/10 flex items-center justify-between border-t pt-2">
              <span className="text-secondary/40 text-[10px]">
                {new Date(post.createdAt).toLocaleDateString('ru-RU')}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="rounded border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-500/20"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="rounded border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-600 transition-colors hover:bg-red-500/20"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-light border-secondary/20 hover:border-secondary/40 rounded border px-3 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Назад
          </button>

          <span className="text-secondary/60 px-3 py-1.5 text-xs">
            Страница {page} из {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="bg-light border-secondary/20 hover:border-secondary/40 rounded border px-3 py-1.5 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default PostsTab;
