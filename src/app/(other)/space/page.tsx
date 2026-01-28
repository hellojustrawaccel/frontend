'use client';

import { motion } from 'motion/react';

import PageContent from '@/components/PageContent';
import PageWrapper from '@/components/PageWrapper';

const SpacePage = () => {
  return (
    <PageWrapper>
      <PageContent>
        <div className="flex h-full flex-col gap-6 text-sm">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.26, 1, 0.6, 1] }}
          >
            <p className="mb-2">
              umm, the idea is that this will be a kind of "space" for my projects, or more
              precisely, the visual part of them. it is currently being refined, and it will
              take some time to determine how it will look.
            </p>
          </motion.div>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default SpacePage;
