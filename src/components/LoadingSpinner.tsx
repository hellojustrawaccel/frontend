'use client';

import { motion } from 'motion/react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner = ({ size = 'md', text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-tertiary flex items-center gap-2"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className={`border-tertiary/20 border-t-tertiary rounded-full border border-t ${sizeClasses[size]}`}
      />
      {text && <span className={textSizeClasses[size]}>{text}</span>}
    </motion.div>
  );
};

export default LoadingSpinner;
