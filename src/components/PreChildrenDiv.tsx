'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

const PreChildrenDiv = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.26, 1, 0.6, 1] }}
      className="relative z-10 max-sm:h-svh max-sm:overflow-y-auto"
    >
      <div key={pathname} className="h-full">
        {children}
      </div>
    </motion.main>
  );
};

export default PreChildrenDiv;
