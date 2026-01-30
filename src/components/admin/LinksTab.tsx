'use client';

import { useState, useEffect } from 'react';
import { getLinks, createLink, updateLink, deleteLink } from '@/lib/queries/links';
import type { BackendLink, CreateLinkRequest } from '@/types';
import Skeleton from '@/components/common/Skeleton';
import ErrorBlock from '@/components/common/ErrorBlock';

type LinksTabProps = {
  token?: string;
};

const LinksTab = ({ token }: LinksTabProps) => {
  const [links, setLinks] = useState<BackendLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<BackendLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CreateLinkRequest>({
    title: '',
    type: '',
    url: '',
    description: '',
    color: '',
    order: 0,
  });

  const loadLinks = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getLinks();
      setLinks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      if (editingLink) {
        await updateLink(editingLink.id, formData, token);
      } else {
        await createLink(formData, token);
      }

      setFormData({ title: '', type: '', url: '', description: '', color: '', order: 0 });
      setEditingLink(null);
      setIsCreating(false);
      loadLinks();
    } catch (err: any) {
      setError(err.message || 'Failed to save link');
    }
  };

  const handleEdit = (link: BackendLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      type: link.type,
      url: link.url,
      description: link.description || '',
      color: link.color || '',
      order: link.order,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Удалить ссылку?')) return;

    try {
      await deleteLink(id, token);
      loadLinks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete link');
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', type: '', url: '', description: '', color: '', order: 0 });
    setEditingLink(null);
    setIsCreating(false);
  };

  if (loading && links.length === 0) {
    return (
      <div className="flex flex-col gap-3 py-12">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <ErrorBlock label="Ошибка" message={error} />}

      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-xs text-white transition-colors"
        >
          + Добавить ссылку
        </button>
      )}

      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="bg-light border-secondary/20 space-y-3 rounded border p-4"
        >
          <h3 className="text-primary text-sm font-medium">
            {editingLink ? 'Редактировать ссылку' : 'Новая ссылка'}
          </h3>

          <input
            type="text"
            placeholder="Название"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={100}
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <input
            type="text"
            placeholder="Тип (home, more)"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <input
            type="url"
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <input
            type="text"
            placeholder="Описание (опционально)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <input
            type="text"
            placeholder="Цвет (опционально, hex)"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <input
            type="number"
            placeholder="Порядок (0, 1, 2...)"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
            }
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-xs text-white transition-colors"
            >
              {editingLink ? 'Сохранить' : 'Создать'}
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
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-light border-secondary/20 flex flex-col justify-between gap-4 rounded border p-4 sm:flex-row sm:items-center"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-primary text-sm font-medium">{link.title}</h4>
                <span className="bg-secondary/10 text-secondary/60 border-secondary/20 rounded border px-2 py-0.5 text-[10px]">
                  {link.type}
                </span>
                <span className="bg-secondary/10 text-secondary/60 border-secondary/20 rounded border px-2 py-0.5 text-[10px]">
                  #{link.order}
                </span>
              </div>
              {link.description && (
                <p className="text-secondary/60 text-xs">{link.description}</p>
              )}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs break-all text-blue-600 hover:underline"
              >
                {link.url}
              </a>
              {link.color && (
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded border"
                    style={{ backgroundColor: link.color }}
                  />
                  <span className="text-secondary/60 text-[10px]">{link.color}</span>
                </div>
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => handleEdit(link)}
                className="rounded border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-500/20"
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="rounded border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-600 transition-colors hover:bg-red-500/20"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksTab;
