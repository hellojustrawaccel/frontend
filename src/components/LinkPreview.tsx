'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  href: string;
  preview: string;
  children: React.ReactNode;
}

type Pos = { top: number; left: number };
type Size = { w: number; h: number };

const LinkPreview = ({ href, preview, children }: Props) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos>({ top: 0, left: 0 });
  const [size, setSize] = useState<Size>({ w: 240, h: 168 });

  const triggerRef = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const hostname = (() => {
    try {
      return new URL(href).hostname;
    } catch {
      return href.replace(/^https?:\/\//, '');
    }
  })();

  const calcPos = (w: number, h: number) => {
    const el = triggerRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const gap = 75;
    const pad = 12;

    let left = r.right + gap;
    let top = r.top + r.height / 2 - h / 2;

    if (left + w + pad > window.innerWidth) {
      left = r.left - gap - w;
    }

    setPos({
      left: Math.max(pad, Math.min(left, window.innerWidth - w - pad)),
      top: Math.max(pad, Math.min(top, window.innerHeight - h - pad)),
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    const el = cardRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    if (r.width && r.height) {
      const w = Math.round(r.width);
      const h = Math.round(r.height);

      if (w !== size.w || h !== size.h) {
        setSize({ w, h });
        calcPos(w, h);
      }
    }
  }, [open, size.w, size.h]);

  const card = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, x: -22, y: 6, scale: 0.99 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: -16,
            y: 6,
            scale: 0.99,
            transition: { duration: 0.22, ease: [0.2, 0.9, 0.2, 1] },
          }}
          transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-9999 w-60 overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl max-sm:hidden"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/10 to-transparent" />

          <div className="relative aspect-video w-full overflow-hidden rounded-xl p-2">
            <img
              src={preview}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full scale-110 rounded-xl object-cover opacity-35 blur-2xl"
              draggable={false}
            />

            <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-t from-black/70 via-black/25 to-black/10" />

            <div className="relative z-10 h-full w-full overflow-hidden rounded-lg">
              <img
                src={preview}
                alt={`Preview of ${hostname}`}
                className="h-full w-full object-contain"
                draggable={false}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <p className="text-tertiary truncate text-xs font-medium">{hostname}</p>
            <svg
              viewBox="0 0 24 24"
              className="text-tertiary size-4 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7" />
              <path d="M9 7h8v8" />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative">
      {typeof document !== 'undefined' && createPortal(card, document.body)}

      <a
        ref={triggerRef}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="group relative flex w-full max-w-44 flex-col whitespace-nowrap no-underline"
      >
        {children}
      </a>
    </div>
  );
};

export default LinkPreview;
