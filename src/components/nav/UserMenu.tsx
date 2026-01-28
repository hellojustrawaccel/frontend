'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Avatar } from './Avatar';
import { cn } from '@/utils/cn';

type UserMenuProps = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export const UserMenu = ({ user, size = 'sm', className }: UserMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointer = (event: MouseEvent) => {
      if (!menuRef.current || menuRef.current.contains(event.target as Node)) {
        return;
      }
      setMenuOpen(false);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  return (
    <div className={cn('relative', className)} ref={menuRef}>
      <button
        onClick={() => setMenuOpen((open) => !open)}
        className="transition-opacity hover:opacity-80"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label="User menu"
      >
        <Avatar src={user.image} name={user.name ?? 'User'} size={size} />
      </button>

      {menuOpen && (
        <div className="border-tertiary/15 animate-in fade-in slide-in-from-top-2 absolute right-0 mt-2 w-36 rounded-md border bg-[#0b0b0b]/95 p-1 text-xs shadow-xl shadow-black/30 backdrop-blur-sm duration-150 sm:right-auto sm:left-0">
          <Link
            href="/profile"
            className="text-tertiary hover:text-primary hover:bg-primary/5 block rounded-sm px-2.5 py-1.5 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            profile
          </Link>

          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="text-tertiary hover:text-primary hover:bg-primary/5 block rounded-sm px-2.5 py-1.5 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              admin
            </Link>
          )}

          <div className="border-tertiary/10 my-1 border-t" />

          <button
            onClick={() => {
              signOut({ callbackUrl: '/' });
              setMenuOpen(false);
            }}
            className="text-tertiary hover:text-primary hover:bg-primary/5 block w-full rounded-sm px-2.5 py-1.5 text-left transition-colors"
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};
