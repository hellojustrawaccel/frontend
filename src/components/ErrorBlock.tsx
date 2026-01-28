import Link from 'next/link';
import { motion } from 'motion/react';
import { BackLink } from '@/components/BackLink';

interface ErrorBlockProps {
  label: string;
  message: string;
}

const ErrorBlock = ({ label, message }: ErrorBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
      className="flex flex-col gap-4"
    >
      <BackLink href="/" text="back to home" />

      <div className="border-tertiary/10 bg-secondary/30 flex flex-col gap-3 rounded-lg border p-4">
        <div className="flex items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-900/50">
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-primary text-sm font-medium">{label}</span>
        </div>

        <p className="text-tertiary text-xs leading-relaxed">{message}</p>
      </div>
    </motion.div>
  );
};

export default ErrorBlock;
