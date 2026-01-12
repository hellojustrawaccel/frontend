'use client';

import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';

const formatShortDuration = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
  const monthsTotal = Math.max(0, end.diff(start, 'month'));
  const years = Math.floor(monthsTotal / 12);
  const months = monthsTotal % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years}y`);
  if (months > 0) parts.push(`${months}mo`);
  if (parts.length === 0) parts.push('0mo');

  return parts.join(' ');
};

type Props = {
  startedAt: string | Date;
  endedAt?: string | Date | null;
};

const ExperienceDuration = ({ startedAt, endedAt }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { label, rangeText } = useMemo(() => {
    const start = dayjs(startedAt);
    const end = endedAt ? dayjs(endedAt) : dayjs();

    return {
      label: formatShortDuration(start, end),
      rangeText: `${start.format('YYYY/MM/DD')} — ${
        endedAt ? end.format('YYYY/MM/DD') : 'Present'
      }`,
    };
  }, [startedAt, endedAt]);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="text-tertiary hover:text-primary inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] leading-none font-medium transition-colors duration-150">
        {label}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
              transition: { duration: 0.12 },
            }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="text-secondary pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-65 -translate-x-1/2 rounded-lg border border-white/10 bg-black/70 px-2.5 py-2 text-xs shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <span className="absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-white/10 bg-black/70" />

            <span className="text-primary block font-medium">date range</span>
            <span className="mt-0.5 block font-mono text-[11px] opacity-80">{rangeText}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default ExperienceDuration;
