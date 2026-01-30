'use client';

import { motion } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { PAGES } from '@/constants/pages.constant';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import UserMenu from './UserMenu';
import AuthButtons from './AuthButtons';

const MobileNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isReady } = useAuth();
  const [showAuthMenu, setShowAuthMenu] = useState(false);

  const navigate = (href: string) => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'instant' });
    router.push(href);
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-100 sm:hidden">
        {!isReady ? (
          <div className="bg-primary/10 flex h-9 items-center justify-center rounded-full px-4">
            <div className="flex gap-1">
              <div className="bg-tertiary/40 h-1 w-1 animate-pulse rounded-full [animation-delay:0ms]" />
              <div className="bg-tertiary/40 h-1 w-1 animate-pulse rounded-full [animation-delay:150ms]" />
              <div className="bg-tertiary/40 h-1 w-1 animate-pulse rounded-full [animation-delay:300ms]" />
            </div>
          </div>
        ) : isAuthenticated && user ? (
          <UserMenu user={user} size="md" />
        ) : (
          <button
            onClick={() => setShowAuthMenu((prev) => !prev)}
            className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-4 py-2 text-xs font-medium transition-colors"
          >
            auth
          </button>
        )}
      </div>

      {showAuthMenu && !isAuthenticated && (
        <>
          <div
            className="fixed inset-0 z-100 bg-black/30 backdrop-blur-sm sm:hidden"
            onClick={() => setShowAuthMenu(false)}
          />
          <div className="border-tertiary/15 animate-in fade-in slide-in-from-top-2 fixed top-16 right-4 z-101 rounded-md border bg-[#0b0b0b]/95 p-2 shadow-xl shadow-black/30 duration-150 sm:hidden">
            <AuthButtons variant="vertical" />
          </div>
        </>
      )}

      <motion.div
        layout
        className="font-karla text-tertiary border-tertiary/15 fixed bottom-4 left-1/2 z-100 w-min -translate-x-1/2 rounded-full border bg-[#0707078e] p-1.5 text-sm shadow-xl shadow-black/5 sm:hidden"
      >
        <div className="flex w-full flex-row items-center justify-center gap-4">
          {Object.entries(PAGES).map(([name, href]) => {
            const isActive = href === '/' ? pathname === href : pathname.includes(href);

            return (
              <button
                key={name}
                onTouchStart={() => router.prefetch?.(href)}
                onTouchEnd={() => navigate(href)}
                onClick={() => navigate(href)}
                className={cn(
                  'hover:text-secondary pointer-events-auto relative px-3 py-1.5 transition-all duration-100 select-none [-webkit-touch-callout:none] active:scale-90',
                  {
                    'text-primary hover:text-primary font-medium': isActive,
                  }
                )}
              >
                {name}

                {isActive ? (
                  <motion.span
                    layoutId="highlight"
                    style={{
                      position: 'absolute',
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.26, 1, 0.6, 1],
                    }}
                    className="bg-tertiary/5 border-secondary/5 top-1/2 left-1/2 h-full w-full -translate-1/2 rounded-full border"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default MobileNav;
