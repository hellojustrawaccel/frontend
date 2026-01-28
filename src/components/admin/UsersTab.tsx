'use client';

import { useState, useEffect } from 'react';
import { getUsers, activateUser, deactivateUser } from '@/services/auth';
import type { User } from '@/types/auth';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBlock from '@/components/ErrorBlock';

type UsersTabProps = {
  token?: string;
};

export function UsersTab({ token }: UsersTabProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<{
    provider?: string;
    active?: boolean;
  }>({});

  const loadUsers = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getUsers(page, limit, filter.provider, filter.active, token);
      setUsers(response.users);
      setTotal(response.total);
    } catch (err: any) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, filter, token]);

  const handleActivate = async (userId: string) => {
    if (!token) return;

    try {
      await activateUser(userId, token);
      loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to activate user');
    }
  };

  const handleDeactivate = async (userId: string) => {
    if (!token) return;

    try {
      await deactivateUser(userId, token);
      loadUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to deactivate user');
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <ErrorBlock label="Ошибка" message={error} />}

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
        <select
          value={filter.provider || ''}
          onChange={(e) => {
            setFilter({ ...filter, provider: e.target.value || undefined });
            setPage(1);
          }}
          className="bg-light border-secondary/20 focus:border-secondary/40 rounded border px-3 py-2 text-xs focus:outline-none"
        >
          <option value="">Все провайдеры</option>
          <option value="passwordless">Passwordless</option>
          <option value="google">Google</option>
          <option value="github">GitHub</option>
          <option value="discord">Discord</option>
          <option value="gitlab">GitLab</option>
        </select>

        <select
          value={filter.active === undefined ? '' : filter.active.toString()}
          onChange={(e) => {
            const value = e.target.value;
            setFilter({
              ...filter,
              active: value === '' ? undefined : value === 'true',
            });
            setPage(1);
          }}
          className="bg-light border-secondary/20 focus:border-secondary/40 rounded border px-3 py-2 text-xs focus:outline-none"
        >
          <option value="">Все статусы</option>
          <option value="true">Активные</option>
          <option value="false">Неактивные</option>
        </select>

        <div className="text-secondary/60 flex items-center text-xs">
          Всего: {total} пользователей
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-light border-secondary/20 flex flex-col justify-between gap-4 rounded border p-4 sm:flex-row sm:items-center"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-primary text-xs font-medium">{user.username}</span>
                <span className="text-secondary/60 text-xs break-all">{user.email}</span>
                {user.isAdmin && (
                  <span className="rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 text-[10px] text-yellow-600">
                    Admin
                  </span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {user.oauthAccounts?.map((account) => {
                  const colors = {
                    google: 'red',
                    github: 'purple',
                    discord: 'indigo',
                    gitlab: 'orange',
                  } as const;

                  const color = colors[account.provider as keyof typeof colors] || 'gray';

                  return (
                    <span
                      key={account.provider}
                      className={`px-2 py-0.5 text-[10px] bg-${color}-500/10 text-${color}-600 border border-${color}-500/20 rounded`}
                    >
                      {account.provider}
                    </span>
                  );
                })}
                {(!user.oauthAccounts || user.oauthAccounts.length === 0) && (
                  <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-600">
                    passwordless
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 sm:shrink-0">
              {user.active ? (
                <button
                  onClick={() => handleDeactivate(user.id)}
                  className="w-full rounded border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-500/20 sm:w-auto"
                >
                  Деактивировать
                </button>
              ) : (
                <button
                  onClick={() => handleActivate(user.id)}
                  className="w-full rounded border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs text-green-600 transition-colors hover:bg-green-500/20 sm:w-auto"
                >
                  Активировать
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
}
