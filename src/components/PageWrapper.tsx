'use client';

import { type HTMLMotionProps, motion } from 'motion/react';

import { cn } from '@/utils/cn.util';

interface Props extends HTMLMotionProps<'div'> {}

const PageWrapper = ({ children, className, ...props }: Props) => (
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
