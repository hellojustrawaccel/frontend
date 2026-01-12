'use client';

import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, useState } from 'react';

import { cn } from '@/utils/cn.util';

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
              'border-primary/10 text-primary pointer-events-none absolute top-full left-0 z-50 mt-2 w-max rounded-md border bg-zinc-900 px-2 py-1 text-xs shadow-lg max-sm:hidden',
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
