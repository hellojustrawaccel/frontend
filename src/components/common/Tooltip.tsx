'use client';

import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, useState } from 'react';

import { cn } from '@/lib/cn';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const Tooltip = forwardRef<HTMLDivElement, Props>(({ children, content, className }, ref) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.26, 1, 0.6, 1] }}
            className={cn(
              'group border-primary/10 fixed left-10 z-10 w-min overflow-clip rounded-md border bg-zinc-950 p-0.5 transition-colors duration-100 max-sm:hidden',
              className
            )}
            style={{
              marginTop: `-2rem`,
              marginLeft: `-0.5rem`,
            }}
          >
            {typeof content === 'string' ? (
              <p className="text-primary w-full rounded-full px-1.5 pt-1 text-center text-xs transition-colors duration-100">
                {content}
              </p>
            ) : (
              content
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
