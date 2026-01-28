'use client';

import { useState, useEffect } from 'react';
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '@/services/experience';
import type { BackendExperience, CreateExperienceRequest } from '@/types/experience';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBlock from '@/components/ErrorBlock';

type ExperienceTabProps = {
  token?: string;
};

export function ExperienceTab({ token }: ExperienceTabProps) {
  const [experiences, setExperiences] = useState<BackendExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingExperience, setEditingExperience] = useState<BackendExperience | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<CreateExperienceRequest>({
    title: '',
    company: '',
    description: '',
    startDate: '',
    endDate: null,
    current: false,
    order: 0,
  });

  const loadExperiences = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const submitData = {
        ...formData,
        endDate: formData.current ? null : formData.endDate,
      };

      if (editingExperience) {
        await updateExperience(editingExperience.id, submitData, token);
      } else {
        await createExperience(submitData, token);
      }

      setFormData({
        title: '',
        company: '',
        description: '',
        startDate: '',
        endDate: null,
        current: false,
        order: 0,
      });
      setEditingExperience(null);
      setIsCreating(false);
      loadExperiences();
    } catch (err: any) {
      setError(err.message || 'Failed to save experience');
    }
  };

  const handleEdit = (experience: BackendExperience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      company: experience.company,
      description: experience.description || '',
      startDate: experience.startDate.split('T')[0],
      endDate: experience.endDate ? experience.endDate.split('T')[0] : null,
      current: experience.current,
      order: experience.order,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Удалить опыт работы?')) return;

    try {
      await deleteExperience(id, token);
      loadExperiences();
    } catch (err: any) {
      setError(err.message || 'Failed to delete experience');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      company: '',
      description: '',
      startDate: '',
      endDate: null,
      current: false,
      order: 0,
    });
    setEditingExperience(null);
    setIsCreating(false);
  };

  if (loading && experiences.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <ErrorBlock label="Ошибка" message={error} />}

      {/* Create Button */}
      {!isCreating && (
        <button
          onClick={() => setIsCreating(true)}
          className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-xs text-white transition-colors"
        >
          + Добавить опыт
        </button>
      )}

      {/* Create/Edit Form */}
      {isCreating && (
        <form
          onSubmit={handleSubmit}
          className="bg-light border-secondary/20 space-y-3 rounded border p-4"
        >
          <h3 className="text-primary text-sm font-medium">
            {editingExperience ? 'Редактировать опыт' : 'Новый опыт'}
          </h3>

          <input
            type="text"
            placeholder="Должность"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={200}
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <input
            type="text"
            placeholder="Компания"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            required
            maxLength={200}
            className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <textarea
            placeholder="Описание (опционально)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="border-secondary/20 focus:border-secondary/40 w-full resize-none rounded border bg-white px-3 py-2 text-xs focus:outline-none"
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-secondary/60 mb-1 block text-xs">Дата начала</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-secondary/60 mb-1 block text-xs">Дата окончания</label>
              <input
                type="date"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value || null })}
                disabled={formData.current}
                className="border-secondary/20 focus:border-secondary/40 w-full rounded border bg-white px-3 py-2 text-xs focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          <label className="text-secondary/60 flex cursor-pointer items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              className="rounded"
            />
            Текущая работа
          </label>

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
              {editingExperience ? 'Сохранить' : 'Создать'}
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

      {/* Experiences List */}
      <div className="space-y-2">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-light border-secondary/20 space-y-2 rounded border p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-primary text-sm font-medium">{exp.title}</h4>
                  <span className="bg-secondary/10 text-secondary/60 border-secondary/20 rounded border px-2 py-0.5 text-[10px]">
                    #{exp.order}
                  </span>
                </div>
                <p className="text-secondary/60 text-xs">{exp.company}</p>
                {exp.description && (
                  <p className="text-secondary/60 mt-1 text-xs">{exp.description}</p>
                )}
              </div>

              <div className="flex shrink-0 gap-2">
                {exp.current && (
                  <span className="rounded border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] text-green-600">
                    Текущая
                  </span>
                )}
              </div>
            </div>

            <div className="border-secondary/10 flex items-center justify-between border-t pt-2">
              <span className="text-secondary/40 text-[10px]">
                {new Date(exp.startDate).toLocaleDateString('ru-RU')} -{' '}
                {exp.current
                  ? 'Настоящее время'
                  : exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString('ru-RU')
                    : '—'}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="rounded border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-500/20"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="rounded border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs text-red-600 transition-colors hover:bg-red-500/20"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
