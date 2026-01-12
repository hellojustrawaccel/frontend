'use client';

import { motion } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';

import { PAGES } from '@/constants/pages.constant';
import { cn } from '@/utils/cn.util';

const MobileNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (href: string) => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'instant' });
    router.push(href);
  };

  return (
    <>
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
