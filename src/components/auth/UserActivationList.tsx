'use client';

import { User } from '@/types/auth';

interface Props {
  users: User[];
  onActivate: (username: string) => void;
}

const UserActivationList = ({ users, onActivate }: Props) => {
  const pendingUsers = users.filter(
    (item) => !item.active && item.provider === 'passwordless'
  );

  return (
    <div className="border-tertiary/20 rounded-md border p-4">
      {pendingUsers.length === 0 ? (
        <p className="text-tertiary text-xs">no pending activations</p>
      ) : (
        <div className="flex flex-col gap-3">
          {pendingUsers.map((pending) => (
            <div key={pending.id} className="flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-primary text-sm">{pending.username}</span>
                <span className="text-tertiary text-xs">{pending.email}</span>
              </div>
              <button
                className="border-tertiary/30 text-tertiary hover:text-primary hover:border-tertiary/50 rounded-md border px-2.5 py-1.5 text-xs transition-colors"
                onClick={() => onActivate(pending.username)}
              >
                activate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserActivationList;
