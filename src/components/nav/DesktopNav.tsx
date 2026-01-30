'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PAGES } from '@/constants/pages.constant';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';

const DesktopNav = () => {
  const pathname = usePathname();
  const { isAuthenticated, user, isReady } = useAuth();

  return !pathname.startsWith('/channel/') ? (
    <div
      key="nav"
      className="font-karla text-tertiary fixed top-10 left-10 z-100 hidden flex-row items-center gap-6 pb-3 text-sm sm:flex"
    >
      <div className="flex items-center gap-2">
        {!isReady ? (
          <AuthButtons variant="horizontal" isLoading />
        ) : isAuthenticated && user ? (
          <UserMenu user={user} size="sm" />
        ) : (
          <AuthButtons variant="horizontal" />
        )}
      </div>

      <div className="flex items-center gap-6">
        {Object.entries(PAGES).map(([name, href]) => {
          const isActive = href === '/' ? pathname === href : pathname.includes(href);

          return (
            <Link
              href={href}
              key={name}
              className={cn('hover:text-secondary relative transition-all duration-150', {
                'text-primary hover:text-primary font-medium': isActive,
              })}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default DesktopNav;
