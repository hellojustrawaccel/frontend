'use client';

import { type HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@/lib/cn';

const PageWrapper = ({ children, className, ...props }: HTMLMotionProps<'div'>) => (
  <motion.div
    className={cn(
      'absolute top-0 left-0 flex h-auto w-full flex-col items-start overflow-y-auto sm:h-screen sm:flex-row',
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export default PageWrapper;
