'use client';

import { motion } from 'motion/react';

import PageContent from '@/components/layout/PageContent';
import PageWrapper from '@/components/layout/PageWrapper';
import Link from 'next/link';

const CVPage = () => {
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
              oops, this is where my resume will be, or rather its complete version, where you
              can customize it. builder for customization is still being developed, but you can
              view the resume{' '}
              <Link
                href={'/cv.pdf'}
                className="text-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                here now
              </Link>
            </p>
          </motion.div>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default CVPage;
